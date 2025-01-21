const mongoose = require("mongoose");

const GenresSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const MovieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  poster_path: { type: String },
  vote_average: { type: Number },
  release_date: { type: String },
  genres: [{ type: GenresSchema }],
  overview: { type: String },
});

module.exports = mongoose.model("Movie", MovieSchema);
