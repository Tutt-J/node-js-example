const express = require("express");
const app = express();
const db = require("./app/models/index.js");
const router = require("./app/routes");
const swaggerUi = require("swagger-ui-express");
YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const path = require("path");
var hateoasLinker = require("express-hateoas-links");
const pinoHttp = require("pino-http");
const {logger} = require("./app/helpers/logger.js")

app.use(pinoHttp({ logger }));

app.use(hateoasLinker);

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

app.use(express.json());
//Ajout des routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));
app.use("/api", pinoHttp({ logger }), router);

module.exports = app;
