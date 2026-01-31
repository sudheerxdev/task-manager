/**
 * Entry point of the application
 * Sets up Express server and MongoDB connection
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

/**
 * ======================
 * Configuration
 * ======================
 */
const PORT = 5000;

// MongoDB connection URL
// (kept simple for local development, can be moved to env later)
const MONGO_URL = "mongodb://127.0.0.1:27017/task_manager";

/**
 * ======================
 * Middleware
 * ======================
 */
app.use(cors());
app.use(express.json());

/**
 * ======================
 * Database Connection
 * ======================
 */
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1); // stop app if DB fails
    });

/**
 * ======================
 * Routes
 * ======================
 */
app.use("/api/tasks", taskRoutes);

// Health check route
app.get("/", (req, res) => {
    res.status(200).send("Task Manager API is running 🚀");
});

/**
 * ======================
 * Start Server
 * ======================
 */
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
