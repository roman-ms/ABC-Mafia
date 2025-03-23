const Location = require("../models/Location");

// @desc Delete a single location by ID
// @route DELETE /api/locations/:id
const deleteLocation = async (req, res) => {
  try {
    console.log("Delete request received for ID:", req.params.id); // Debugging log

    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "❌ Location not found" });
    }

    res.json({ message: "✅ Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting location:", error.message); // Debugging log
    res
      .status(500)
      .json({ message: "❌ Error deleting location", error: error.message });
  }
};

// @desc Delete all locations
// @route DELETE /api/locations
const deleteAllLocations = async (req, res) => {
  try {
    await Location.deleteMany({});
    res.json({ message: "✅ All locations deleted successfully" });
  } catch (error) {
    console.error("Error deleting locations:", error.message);
    res
      .status(500)
      .json({ message: "❌ Error deleting locations", error: error.message });
  }
};

module.exports = { deleteLocation, deleteAllLocations };
