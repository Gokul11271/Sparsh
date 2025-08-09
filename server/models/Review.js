// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    location: String,
    content: String,
    rating: { type: Number, default: 5 },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
