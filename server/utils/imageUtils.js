const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

// Get image dimensions
const getImageDimensions = async (filePath) => {
  try {
    const metadata = await sharp(filePath).metadata()
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    }
  } catch (error) {
    console.error("Error getting image dimensions:", error)
    return null
  }
}

// Create thumbnail
const createThumbnail = async (inputPath, outputPath, width = 300, height = 300) => {
  try {
    await sharp(inputPath).resize(width, height, { fit: "cover" }).jpeg({ quality: 80 }).toFile(outputPath)
    return true
  } catch (error) {
    console.error("Error creating thumbnail:", error)
    return false
  }
}

// Optimize image
const optimizeImage = async (inputPath, outputPath, quality = 85) => {
  try {
    const metadata = await sharp(inputPath).metadata()

    if (metadata.format === "jpeg" || metadata.format === "jpg") {
      await sharp(inputPath).jpeg({ quality }).toFile(outputPath)
    } else if (metadata.format === "png") {
      await sharp(inputPath).png({ quality }).toFile(outputPath)
    } else if (metadata.format === "webp") {
      await sharp(inputPath).webp({ quality }).toFile(outputPath)
    } else {
      // Convert other formats to JPEG
      await sharp(inputPath).jpeg({ quality }).toFile(outputPath)
    }

    return true
  } catch (error) {
    console.error("Error optimizing image:", error)
    return false
  }
}

module.exports = {
  getImageDimensions,
  createThumbnail,
  optimizeImage,
}
