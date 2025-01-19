const express = require("express");
const Show = require("../models/Show");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    const savedShow = await newShow.save();
    res.json(savedShow);
  } catch (error) {
    res.status(400).json({ error: "Failed to add show" });
  }
});

module.exports = router;
