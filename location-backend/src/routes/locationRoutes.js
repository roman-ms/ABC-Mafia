const express = require("express");
const {
  addLocation,
  getLocations,
  deleteLocation,
  deleteAllLocations,
} = require("../controllers/locationController");

const router = express.Router();

// ✅ Log all route requests (for debugging)
router.use((req, res, next) => {
  console.log(`🔹 Route middleware: ${req.method} ${req.url}`);
  next();
});

router.post("/", addLocation);
router.get("/", getLocations);
router.delete("/:id", deleteLocation);
router.delete("/", deleteAllLocations);

module.exports = router;
