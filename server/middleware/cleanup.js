const fs = require("fs")
const path = require("path")
const Image = require("../models/Image")

// Cleanup orphaned files (files that exist but not in database)
const cleanupOrphanedFiles = async () => {
  try {
    const uploadsDir = path.join(__dirname, "../uploads")

    if (!fs.existsSync(uploadsDir)) {
      return
    }

    const files = fs.readdirSync(uploadsDir)
    const dbImages = await Image.find({}, "publicId")
    const dbFileNames = dbImages.map((img) => img.publicId)

    for (const file of files) {
      if (!dbFileNames.includes(file)) {
        const filePath = path.join(uploadsDir, file)
        fs.unlinkSync(filePath)
        console.log(`Cleaned up orphaned file: ${file}`)
      }
    }
  } catch (error) {
    console.error("Cleanup error:", error)
  }
}

// Run cleanup every hour
setInterval(cleanupOrphanedFiles, 60 * 60 * 1000)

module.exports = { cleanupOrphanedFiles }
