const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const Image = require("../models/Image")
const auth = require("../middleware/auth")

const router = express.Router()

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const extension = path.extname(file.originalname)
    cb(null, `sparsh-${uniqueSuffix}${extension}`)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"), false)
    }
  },
})

// Upload image
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      })
    }

    const { title, description, sector, template, tags } = req.body

    // Create image URL for local file
    const imageUrl = `/uploads/${req.file.filename}`

    // Create image record
    const image = new Image({
      title,
      description,
      imageUrl,
      publicId: req.file.filename, // Use filename as publicId for local storage
      sector,
      template,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      uploadedBy: req.user.userId,
      metadata: {
        size: req.file.size,
        format: path.extname(req.file.originalname).substring(1),
        width: null, // We could add image dimensions later if needed
        height: null,
      },
    })

    await image.save()
    await image.populate("uploadedBy", "username email")

    // Emit real-time update
    req.io.emit("imageUploaded", {
      image: image.toObject(),
      message: "New image uploaded",
    })

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image,
    })
  } catch (error) {
    console.error("Upload error:", error)

    // Clean up uploaded file if database save failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.status(500).json({
      success: false,
      message: error.message || "Error uploading image",
    })
  }
})

// Get all images (admin)
router.get("/admin", auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, sector, template, search } = req.query

    const query = {}
    if (sector) query.sector = sector
    if (template) query.template = template
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    const images = await Image.find(query)
      .populate("uploadedBy", "username email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Image.countDocuments(query)

    // Convert local file paths to full URLs
    const imagesWithFullUrls = images.map((image) => ({
      ...image.toObject(),
      imageUrl: `${req.protocol}://${req.get("host")}${image.imageUrl}`,
    }))

    res.json({
      success: true,
      images: imagesWithFullUrls,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    console.error("Get images error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching images",
    })
  }
})

// Update image
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, sector, template, tags, isActive } = req.body

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        sector,
        template,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        isActive,
      },
      { new: true, runValidators: true },
    ).populate("uploadedBy", "username email")

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      })
    }

    // Convert local file path to full URL
    const imageWithFullUrl = {
      ...image.toObject(),
      imageUrl: `${req.protocol}://${req.get("host")}${image.imageUrl}`,
    }

    // Emit real-time update
    req.io.emit("imageUpdated", {
      image: imageWithFullUrl,
      message: "Image updated",
    })

    res.json({
      success: true,
      message: "Image updated successfully",
      image: imageWithFullUrl,
    })
  } catch (error) {
    console.error("Update image error:", error)
    res.status(500).json({
      success: false,
      message: "Error updating image",
    })
  }
})

// Delete image
router.delete("/:id", auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      })
    }

    // Delete physical file
    const filePath = path.join(uploadsDir, image.publicId)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    // Delete from database
    await Image.findByIdAndDelete(req.params.id)

    // Emit real-time update
    req.io.emit("imageDeleted", {
      imageId: req.params.id,
      message: "Image deleted",
    })

    res.json({
      success: true,
      message: "Image deleted successfully",
    })
  } catch (error) {
    console.error("Delete image error:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting image",
    })
  }
})

module.exports = router
