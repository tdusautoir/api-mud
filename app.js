const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


let app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

// connect to database
mongoose.connect(process.env.MONGO_URI);

// Routes

app.get("/", (req, res) => {
  res.json("First Commit !");
});

// error 404
app.use(({ res }) => {
  let message = "Impossible de trouver la ressource demandée !";
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Appli démarrée sur localhost:${port}`);
});
