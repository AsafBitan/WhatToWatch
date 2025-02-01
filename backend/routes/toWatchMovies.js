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


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received delete request for ID:", id);
    const deletedMovie = await ToWatchMovie.findOneAndDelete({ id });

    if (!deletedMovie){
      return res.status(404).json({ message: 'Movie not found' })
    }
    res.status(200).json({ message: 'Movie deleted successfully', deletedMovie })
  } catch (error){
    res.status(500).json({ message: 'Error deleteing movie', error})
  }
})

module.exports = router;
