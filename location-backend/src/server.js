const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db"); // Import database connection
const locationRoutes = require("./routes/locationRoutes");

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Middleware for JSON requests
app.use(cors()); // Allow frontend requests

// API Routes
app.use("/api/locations", locationRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
