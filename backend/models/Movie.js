const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["movie", "tvshow"], required: true },
  primaryImage: { type: String },
  averageRating: { type: Number },
  releaseDate: { type: String },
  genres: [{ type: String }],
  description: { type: String },
});

module.exports = mongoose.model("Movie", MovieSchema);
