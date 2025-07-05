const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const routes = require("./routes");
app.use("/", routes);

module.exports = app;
