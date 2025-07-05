const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const routes = require("./routes");
app.get("/", (req, res) => {
  res.send("URL Shortener backend is running 🚀");
});

app.use("/", routes);

module.exports = app;
