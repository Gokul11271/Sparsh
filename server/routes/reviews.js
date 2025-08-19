const express = require("express");
const Review = require("../models/Review");
const auth = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Configure Cloudinary storage for review images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sparsh-reviews",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 200, height: 200, crop: "fill", gravity: "face" },
      { quality: "auto", fetch_format: "auto" },
    ],
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Get public reviews (approved and visible only)
router.get("/public", async (req, res) => {
  try {
    const { limit = 4 } = req.query;

    const reviews = await Review.find({
      isApproved: true,
      isVisible: true,
    })
      .sort({ createdAt: -1 })
      .limit(Number.parseInt(limit))
      .select("-email -ipAddress -approvedBy");

    res.json({
      success: true,
      data: reviews,
      count: reviews.length,
    });
  } catch (error) {
    console.error("Get public reviews error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });
  }
});

// Submit a new review
// router.post("/submit", upload.single("image"), async (req, res) => {
//   try {
//     const { name, email, role, location, content, rating } = req.body;

//     // Validate required fields
//     if (!name || !email || !role || !location || !content || !rating) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Validate rating
//     const ratingNum = Number.parseInt(rating);
//     if (ratingNum < 1 || ratingNum > 5) {
//       return res.status(400).json({
//         success: false,
//         message: "Rating must be between 1 and 5",
//       });
//     }

//     // Check if user has already submitted a review with this email
//     const existingReview = await Review.findOne({ email: email.toLowerCase() });
//     if (existingReview) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already submitted a review. Thank you!",
//       });
//     }

//     // Get client IP
//     const clientIP =
//       req.headers["x-forwarded-for"]?.split(",")[0] ||
//       req.headers["x-real-ip"] ||
//       req.connection.remoteAddress ||
//       "unknown";

//     // Create review
//     const review = new Review({
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       role: role.trim(),
//       location: location.trim(),
//       content: content.trim(),
//       rating: ratingNum,
//       image: req.file ? req.file.path : "",
//       ipAddress: clientIP,
//     });

//     await review.save();

//     res.json({
//       success: true,
//       message:
//         "Thank you for your review! It will be published after approval.",
//       reviewId: review._id,
//     });
//   } catch (error) {
//     console.error("Submit review error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error submitting review. Please try again.",
//     });
//   }
// });
router.post("/submit", upload.single("image"), async (req, res) => {
  try {
    const { name, email, role, location, content, rating } = req.body;

    // Validate required fields
    if (!name || !email || !role || !location || !content || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate rating
    const ratingNum = Number.parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check for duplicate review by email
    const existingReview = await Review.findOne({ email: email.toLowerCase() });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review. Thank you!",
      });
    }

    // Get client IP (Render/NGINX passes via headers)
    const clientIP =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress ||
      "unknown";

    // Create review document
    const review = new Review({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role.trim(),
      location: location.trim(),
      content: content.trim(),
      rating: ratingNum,
      image: req.file ? req.file.path : "",
      ipAddress: clientIP,
    });

    await review.save();

    res.json({
      success: true,
      message:
        "Thank you for your review! It will be published after approval.",
      reviewId: review._id,
    });
  } catch (error) {
    console.error("Submit review error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting review. Please try again.",
    });
  }
});



// Admin routes (require authentication)

// Get all reviews for admin
router.get("/admin", auth, async (req, res) => {
  try {
    const {
      status = "all",
      page = 1,
      limit = 20,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    // Filter by status
    if (status === "pending") {
      query.isApproved = false;
    } else if (status === "approved") {
      query.isApproved = true;
    } else if (status === "hidden") {
      query.isVisible = false;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const reviews = await Review.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number.parseInt(limit))
      .populate("approvedBy", "username email");

    const total = await Review.countDocuments(query);

    // Get counts for different statuses
    const statusCounts = await Review.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$isApproved", false] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ["$isApproved", true] }, 1, 0] } },
          hidden: { $sum: { $cond: [{ $eq: ["$isVisible", false] }, 1, 0] } },
        },
      },
    ]);

    res.json({
      success: true,
      data: reviews,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / Number.parseInt(limit)),
        total,
        limit: Number.parseInt(limit),
      },
      counts: statusCounts[0] || {
        total: 0,
        pending: 0,
        approved: 0,
        hidden: 0,
      },
    });
  } catch (error) {
    console.error("Get admin reviews error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });
  }
});

// Approve review
router.put("/admin/:id/approve", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      {
        isApproved: true,
        isVisible: true,
        approvedBy: req.user.userId,
        approvedAt: new Date(),
      },
      { new: true }
    ).populate("approvedBy", "username email");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Review approved successfully",
      data: review,
    });
  } catch (error) {
    console.error("Approve review error:", error);
    res.status(500).json({
      success: false,
      message: "Error approving review",
    });
  }
});

// Hide/Show review
router.put("/admin/:id/visibility", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;

    const review = await Review.findByIdAndUpdate(
      id,
      { isVisible: Boolean(isVisible) },
      { new: true }
    ).populate("approvedBy", "username email");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      message: `Review ${isVisible ? "shown" : "hidden"} successfully`,
      data: review,
    });
  } catch (error) {
    console.error("Update review visibility error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating review visibility",
    });
  }
});

// Delete review
router.delete("/admin/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Delete image from Cloudinary if exists
    if (review.image) {
      try {
        const publicId = review.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`sparsh-reviews/${publicId}`);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }

    await Review.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting review",
    });
  }
});

// Get review statistics
router.get("/admin/stats", auth, async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          approvedReviews: { $sum: { $cond: ["$isApproved", 1, 0] } },
          pendingReviews: { $sum: { $cond: [{ $not: "$isApproved" }, 1, 0] } },
          hiddenReviews: { $sum: { $cond: [{ $not: "$isVisible" }, 1, 0] } },
          averageRating: { $avg: "$rating" },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ]);

    // Calculate rating distribution
    const ratingCounts = await Review.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const ratingDistribution = {};
    for (let i = 1; i <= 5; i++) {
      ratingDistribution[i] = 0;
    }
    ratingCounts.forEach((item) => {
      ratingDistribution[item._id] = item.count;
    });

    res.json({
      success: true,
      data: {
        ...stats[0],
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error("Get review stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching review statistics",
    });
  }
});

module.exports = router;
