const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Country = require("./models/Header/Country");
const Year = require("./models/Header/Year");
const Pillar = require("./models/Pillar/Pillar");

const app = express();
const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://biveciw992:asYSPFM5OFGsmJk7@countrydata.b5ngotm.mongodb.net/?retryWrites=true&w=majority&appName=CountryData",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors());

// routes
app.get("/countries", (req, res) => {
  Country.find({})
    .then((countries) => res.json(countries))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/years", (req, res) => {
  Year.find({})
    .then((years) => res.json(years))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/pillars", async (req, res) => {
  try {
    const pillars = await Pillar.find();
    res.json(pillars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
