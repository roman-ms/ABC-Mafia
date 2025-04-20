const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  name: String,
  type: String,
  place_id: String,
  formatted_address: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("Location", LocationSchema);
