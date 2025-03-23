const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const locationRoutes = require("./routes/locationRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Ensure Express logs all requests
app.use((req, res, next) => {
  console.log(`📢 Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ methods: ["GET", "POST", "DELETE"] })); // ✅ Allow DELETE requests

// ✅ Explicitly set routes
app.use("/api/locations", locationRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ✅ Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
