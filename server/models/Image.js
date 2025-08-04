const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String, // For Cloudinary
      required: true,
    },
    sector: {
      type: String,
      required: true,
      enum: ["Wedding", "Corporate", "Fashion", "Traditional", "Casual", "Festive", "Bridal", "Evening"],
    },
    template: {
      type: String,
      required: true,
      enum: ["Portrait", "Landscape", "Square", "Collage", "Minimalist", "Vintage", "Modern", "Classic"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metadata: {
      size: Number,
      format: String,
      width: Number,
      height: Number,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
imageSchema.index({ sector: 1, template: 1 })
imageSchema.index({ isActive: 1 })
imageSchema.index({ createdAt: -1 })

module.exports = mongoose.model("Image", imageSchema)
