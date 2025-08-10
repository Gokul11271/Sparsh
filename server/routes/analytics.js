const express = require("express");
const Visitor = require("../models/Visitor");
const auth = require("../middleware/auth");
const axios = require("axios");

const router = express.Router();

// Track visitor
router.post("/track", async (req, res) => {
  try {
    const { sessionId, page, referrer, userAgent, isFirstVisit } = req.body;

    // Get client IP address
    const clientIP =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      "127.0.0.1";

    // Clean IP address (remove IPv6 prefix if present)
    const cleanIP = clientIP.replace(/^::ffff:/, "");

    // Check if we already have location data for this IP in the last 24 hours
    const existingVisitor = await Visitor.findOne({
      ipAddress: cleanIP,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    }).sort({ createdAt: -1 });

    let locationData = {
      city: "Unknown",
      country: "Unknown",
      countryCode: "XX",
      region: "Unknown",
      latitude: null,
      longitude: null,
      timezone: "UTC",
      isp: "Unknown",
    };

    // If we have recent location data, use it
    if (existingVisitor && existingVisitor.location) {
      locationData = existingVisitor.location;
    } else if (cleanIP !== "127.0.0.1" && cleanIP !== "::1") {
      // Fetch location data from IP API (only for non-localhost IPs)
      try {
        const response = await axios.get(
          `http://ip-api.com/json/${cleanIP}?fields=status,country,countryCode,region,city,lat,lon,timezone,isp`,
          {
            timeout: 5000,
          }
        );

        if (response.data && response.data.status === "success") {
          locationData = {
            city: response.data.city || "Unknown",
            country: response.data.country || "Unknown",
            countryCode: response.data.countryCode || "XX",
            region: response.data.region || "Unknown",
            latitude: response.data.lat || null,
            longitude: response.data.lon || null,
            timezone: response.data.timezone || "UTC",
            isp: response.data.isp || "Unknown",
          };
        }
      } catch (error) {
        console.error("IP geolocation API error:", error.message);
        // Use default location data if API fails
      }
    }

    // Create visitor record
    const visitor = new Visitor({
      ipAddress: cleanIP,
      sessionId,
      location: locationData,
      userAgent: userAgent || "",
      referrer: referrer || "",
      page: page || "/",
      isFirstVisit: isFirstVisit || false,
    });

    await visitor.save();

    res.json({
      success: true,
      message: "Visitor tracked successfully",
      location: locationData,
    });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    res.status(500).json({
      success: false,
      message: "Error tracking visitor",
    });
  }
});

// Update visit duration
router.put("/track/:sessionId/duration", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { duration } = req.body;

    await Visitor.findOneAndUpdate(
      { sessionId },
      { visitDuration: duration },
      { sort: { createdAt: -1 } }
    );

    res.json({
      success: true,
      message: "Visit duration updated",
    });
  } catch (error) {
    console.error("Duration update error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating visit duration",
    });
  }
});

// Get analytics data (admin only)
router.get("/stats", auth, async (req, res) => {
  try {
    const { period = "daily", startDate, endDate } = req.query;

    const matchStage = {};

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Daily stats
    if (period === "daily") {
      const dailyStats = await Visitor.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              country: "$location.country",
              city: "$location.city",
            },
            count: { $sum: 1 },
            uniqueIPs: { $addToSet: "$ipAddress" },
            firstVisits: { $sum: { $cond: ["$isFirstVisit", 1, 0] } },
          },
        },
        {
          $project: {
            date: "$_id.date",
            country: "$_id.country",
            city: "$_id.city",
            count: 1,
            uniqueVisitors: { $size: "$uniqueIPs" },
            firstVisits: 1,
          },
        },
        { $sort: { date: -1 } },
        { $limit: 100 },
      ]);

      return res.json({
        success: true,
        data: dailyStats,
        type: "daily",
      });
    }

    // Monthly stats
    if (period === "monthly") {
      const monthlyStats = await Visitor.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalVisits: { $sum: 1 },
            uniqueVisitors: { $addToSet: "$ipAddress" },
            countries: { $addToSet: "$location.country" },
            firstVisits: { $sum: { $cond: ["$isFirstVisit", 1, 0] } },
          },
        },
        {
          $project: {
            month: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                {
                  $toString: {
                    $cond: [
                      { $lt: ["$_id.month", 10] },
                      { $concat: ["0", { $toString: "$_id.month" }] },
                      { $toString: "$_id.month" },
                    ],
                  },
                },
              ],
            },
            totalVisits: 1,
            uniqueVisitors: { $size: "$uniqueVisitors" },
            uniqueCountries: { $size: "$countries" },
            firstVisits: 1,
          },
        },
        { $sort: { month: -1 } },
        { $limit: 12 },
      ]);

      return res.json({
        success: true,
        data: monthlyStats,
        type: "monthly",
      });
    }

    // Country stats
    if (period === "countries") {
      const countryStats = await Visitor.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: {
              country: "$location.country",
              countryCode: "$location.countryCode",
            },
            totalVisits: { $sum: 1 },
            uniqueVisitors: { $addToSet: "$ipAddress" },
            cities: { $addToSet: "$location.city" },
            firstVisits: { $sum: { $cond: ["$isFirstVisit", 1, 0] } },
          },
        },
        {
          $project: {
            country: "$_id.country",
            countryCode: "$_id.countryCode",
            totalVisits: 1,
            uniqueVisitors: { $size: "$uniqueVisitors" },
            uniqueCities: { $size: "$cities" },
            firstVisits: 1,
          },
        },
        { $sort: { totalVisits: -1 } },
        { $limit: 50 },
      ]);

      return res.json({
        success: true,
        data: countryStats,
        type: "countries",
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid period specified",
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics data",
    });
  }
});

// Get dashboard overview
router.get("/overview", auth, async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Today's stats
    const todayStats = await Visitor.aggregate([
      { $match: { createdAt: { $gte: today } } },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$ipAddress" },
          countries: { $addToSet: "$location.country" },
          firstVisits: { $sum: { $cond: ["$isFirstVisit", 1, 0] } },
        },
      },
    ]);

    // Yesterday's stats
    const yesterdayStats = await Visitor.aggregate([
      { $match: { createdAt: { $gte: yesterday, $lt: today } } },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$ipAddress" },
        },
      },
    ]);

    // This month's stats
    const thisMonthStats = await Visitor.aggregate([
      { $match: { createdAt: { $gte: thisMonth } } },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$ipAddress" },
          countries: { $addToSet: "$location.country" },
        },
      },
    ]);

    // Last month's stats
    const lastMonthStats = await Visitor.aggregate([
      { $match: { createdAt: { $gte: lastMonth, $lt: thisMonth } } },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$ipAddress" },
        },
      },
    ]);

    // Recent visitors
    const recentVisitors = await Visitor.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select("location createdAt ipAddress page userAgent visitDuration");

    // Top countries
    const topCountries = await Visitor.aggregate([
      {
        $group: {
          _id: "$location.country",
          count: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$ipAddress" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const overview = {
      today: {
        totalVisits: todayStats[0]?.totalVisits || 0,
        uniqueVisitors: todayStats[0]?.uniqueVisitors?.length || 0,
        countries: todayStats[0]?.countries?.length || 0,
        firstVisits: todayStats[0]?.firstVisits || 0,
      },
      yesterday: {
        totalVisits: yesterdayStats[0]?.totalVisits || 0,
        uniqueVisitors: yesterdayStats[0]?.uniqueVisitors?.length || 0,
      },
      thisMonth: {
        totalVisits: thisMonthStats[0]?.totalVisits || 0,
        uniqueVisitors: thisMonthStats[0]?.uniqueVisitors?.length || 0,
        countries: thisMonthStats[0]?.countries?.length || 0,
      },
      lastMonth: {
        totalVisits: lastMonthStats[0]?.totalVisits || 0,
        uniqueVisitors: lastMonthStats[0]?.uniqueVisitors?.length || 0,
      },
      recentVisitors,
      topCountries,
    };

    res.json({
      success: true,
      data: overview,
    });
  } catch (error) {
    console.error("Analytics overview error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics overview",
    });
  }
});

module.exports = router;
