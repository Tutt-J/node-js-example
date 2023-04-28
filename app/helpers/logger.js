const pino = require("pino");
const fs = require("fs");
const path = require("path")
// Création du dossier de log s'il n'existe pas
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

const logFilePath = path.join('./', 'logs', 'app.log');
const fileStream = pino.destination(logFilePath);
// Création d'une instance de Pino qui utilise le flux de sortie pour écrire les logs dans le fichier
const logger = pino(
  {
    level: "debug", // le niveau de journalisation par défaut pour l'application
    base: null, // ne pas ajouter d'informations de contexte par défaut
    formatters: {
      level(label) {
        return { level: label };
      },
      bindings(bindings) {
        return {};
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime, // Format de la date et de l'heure dans les logs
    base: null, // Ne pas inclure de propriétés supplémentaires dans chaque log
  },
  fileStream
);


module.exports = {
    logger
};
