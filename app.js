const express = require("express");
const app = express();
const db = require("./app/models/index.js");
const router = require("./app/routes");

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

app.use(express.json());
//Ajout des routes
app.use("/api", router);

module.exports = app;
