const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Location = require("./src/models/Location"); // Adjust path if needed

dotenv.config(); // Load environment variables

const importData = async () => {
  try {
    // Read the JSON file
    const filePath = path.join(__dirname, "data", "locations.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const locations = JSON.parse(jsonData);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Insert data into MongoDB
    await Location.insertMany(locations);
    console.log("✅ Locations imported successfully!");

    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error importing locations:", error);
    process.exit(1);
  }
};

// Run the script
importData();
