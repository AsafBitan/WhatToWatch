const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`Response status: ${res.statusCode}`);
  });
  next();
});

const mongoUri = process.env.EXPO_PUBLIC_MONGO_URI;

if (!mongoUri) {
  console.error("uri is not defined");
  throw new Error("Missing uri");
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const movieRoutes = require("./routes/movies");
app.use("/api/movies", movieRoutes);

const showRoutes = require("./routes/shows");
app.use("/api/shows", showRoutes);

const toWatchMoviesRoutes = require("./routes/toWatchMovies");
app.use("/api/toWatchMovies", toWatchMoviesRoutes);

const toWatchShowRoutes = require("./routes/toWatchShows");
app.use("/api/toWatchShows", toWatchShowRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));


