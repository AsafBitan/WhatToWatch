const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMoive.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: "Failed to add movie" });
  }
});

module.exports = router;
