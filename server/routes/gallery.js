const express = require("express")
const Image = require("../models/Image")

const router = express.Router()

// Get public gallery images
router.get("/", async (req, res) => {
  try {
    const { sector, template, limit = 50 } = req.query

    const query = { isActive: true }
    if (sector) query.sector = sector
    if (template) query.template = template

    const images = await Image.find(query)
      .select("title description imageUrl sector template tags createdAt")
      .sort({ createdAt: -1 })
      .limit(Number.parseInt(limit))

    // Convert local file paths to full URLs
    const imagesWithFullUrls = images.map((image) => ({
      ...image.toObject(),
      imageUrl: `${req.protocol}://${req.get("host")}${image.imageUrl}`,
    }))

    // Group by sector
    const groupedBySector = imagesWithFullUrls.reduce((acc, image) => {
      if (!acc[image.sector]) {
        acc[image.sector] = []
      }
      acc[image.sector].push(image)
      return acc
    }, {})

    res.json({
      success: true,
      images: imagesWithFullUrls,
      groupedBySector,
      total: imagesWithFullUrls.length,
    })
  } catch (error) {
    console.error("Get gallery error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching gallery images",
    })
  }
})

// Get sectors and templates for filters
router.get("/filters", async (req, res) => {
  try {
    const sectors = await Image.distinct("sector", { isActive: true })
    const templates = await Image.distinct("template", { isActive: true })

    res.json({
      success: true,
      sectors,
      templates,
    })
  } catch (error) {
    console.error("Get filters error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching filters",
    })
  }
})

// Get single image
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.id,
      isActive: true,
    }).select("title description imageUrl sector template tags createdAt")

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

    res.json({
      success: true,
      image: imageWithFullUrl,
    })
  } catch (error) {
    console.error("Get image error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching image",
    })
  }
})

module.exports = router
