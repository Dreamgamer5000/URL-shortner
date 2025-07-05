const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: String,
  originalUrl: String,
  hitCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Url", urlSchema);
