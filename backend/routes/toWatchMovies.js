const express = require("express");
const ToWatchMovie = require("../models/ToWatchMovie");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await ToWatchMovie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Received request:", req.body);  // Add logging
    const newToWatchMovie = new ToWatchMovie(req.body);
    const savedMovie = await newToWatchMovie.save();
    console.log("Movie saved:", savedMovie);  // Add logging
    res.json(savedMovie);
  } catch (error) {
    console.error("Error saving movie:", error);  // Add logging
    res.status(400).json({ error: "Failed to add movie" });
  }
});

module.exports = router;
