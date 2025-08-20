// routes/visitors.js
const express = require("express");
const Visitor = require("./models/visitor"); // path to your visitor.js
const router = express.Router();

router.post("/track", async (req, res) => {
  try {
    const { sessionId, page, referrer, userAgent, isFirstVisit } = req.body;

    // Capture IP address
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

    const visitor = new Visitor({
      ipAddress,
      sessionId,
      page,
      referrer,
      userAgent,
      isFirstVisit,
    });

    await visitor.save();

    res.status(201).json({ success: true, visitor });
  } catch (error) {
    console.error("❌ Error saving visitor:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
