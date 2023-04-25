const express = require("express");
const app = express();
const db = require("./app/models/index.js");
const router = require("./app/routes");
const swaggerUi = require('swagger-ui-express');
YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

app.use(express.json());
//Ajout des routes
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use("/api", router);

module.exports = app;
