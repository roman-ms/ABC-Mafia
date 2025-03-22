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

module.exports = { addLocation, getLocations };
