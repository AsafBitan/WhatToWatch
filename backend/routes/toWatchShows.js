const express = require("express");
const ToWatchShow = require("../models/ToWatchShow");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const shows = await ToWatchShow.find();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const newToWatchShow = new ToWatchShow(req.body);
    const savedShow = await newToWatchShow.save();
    res.json(savedShow);
  } catch (error) {
    res.status(400).json({ error: "Failed to add show" });
  }
});

module.exports = router;
