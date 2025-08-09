// routes/reviews.js
const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// Get reviews (limit to 4 for homepage)
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 0; // pass ?limit=4 for homepage
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(limit);
  res.json(reviews);
});

// Add review (public)
router.post("/", async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
});

// Delete review (admin only)
router.delete("/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
});

module.exports = router;
