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
    console.log("Received request:", req.body);
    const newShow = new Show(req.body);
    const savedShow = await newShow.save();
    res.json(savedShow);
  } catch (error) {
    res.status(400).json({ error: "Failed to add show" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received delete request for ID:", id);
    const deletedShow = await Show.findOneAndDelete({ id });

    if (!deletedShow){
      return res.status(404).json({ message: 'Show not found' })
    }
    res.status(200).json({ message: 'Show deleted successfully', deletedShow })
  } catch (error){
    res.status(500).json({ message: 'Error deleteing show', error})
  }
})

module.exports = router;
