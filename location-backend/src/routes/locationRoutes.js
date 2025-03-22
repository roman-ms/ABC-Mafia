const express = require("express");
const {
  addLocation,
  getLocations,
} = require("../controllers/locationController");
const router = express.Router();

router.post("/", addLocation);
router.get("/", getLocations);

module.exports = router;
