const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    location: {
      city: {
        type: String,
        default: "Unknown",
      },
      country: {
        type: String,
        default: "Unknown",
      },
      countryCode: {
        type: String,
        default: "XX",
      },
      region: {
        type: String,
        default: "Unknown",
      },
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },
      timezone: {
        type: String,
        default: "UTC",
      },
      isp: {
        type: String,
        default: "Unknown",
      },
    },
    userAgent: {
      type: String,
      default: "",
    },
    referrer: {
      type: String,
      default: "",
    },
    page: {
      type: String,
      default: "/",
    },
    isFirstVisit: {
      type: Boolean,
      default: true,
    },
    visitDuration: {
      type: Number, // in seconds
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ "location.country": 1 });
visitorSchema.index({ "location.city": 1 });
visitorSchema.index({ ipAddress: 1, sessionId: 1 });

// Compound index for analytics queries
visitorSchema.index({
  createdAt: -1,
  "location.country": 1,
  "location.city": 1,
});

module.exports = mongoose.model("Visitor", visitorSchema);
