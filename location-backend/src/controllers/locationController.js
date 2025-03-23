const Location = require("../models/Location");

// @desc Add a new location
// @route POST /api/locations
const addLocation = async (req, res) => {
  try {
    const { name, latitude, longitude, description } = req.body;
    const newLocation = new Location({
      name,
      latitude,
      longitude,
      description,
    });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all locations
// @route GET /api/locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a single location by ID
// @route DELETE /api/locations/:id
const deleteLocation = async (req, res) => {
  try {
    console.log(`🔹 Received DELETE request for ID: ${req.params.id}`);

    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "❌ Location not found" });
    }

    res.json({
      message: "✅ Location deleted successfully",
      deletedLocation: location,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error deleting location", error: error.message });
  }
};

// @desc Delete all locations
// @route DELETE /api/locations
const deleteAllLocations = async (req, res) => {
  try {
    console.log("🔹 Received DELETE request to /api/locations");

    const result = await Location.deleteMany({});
    console.log("✅ Delete result:", result);

    res.json({ message: "✅ All locations deleted successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error deleting locations", error: error.message });
  }
};

module.exports = {
  addLocation,
  getLocations,
  deleteLocation,
  deleteAllLocations,
};
