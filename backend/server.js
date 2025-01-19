const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.EXPO_PUBLIC_MONGO_URI;

if (!mongoUri) {
  console.error("uri is not defined");
  throw new Error("Missing uri");
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error(error));

const movieRoutes = require("./routes/movies");
app.use("/api/movies", movieRoutes);

const showRoutes = require("./routes/shows");
app.use("/api/shows", showRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
