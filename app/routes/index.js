const express = require('express')
const router = express.Router();
const userRoutes = require('./user.js') //Ce fichier n’existe pas encore.
const woodRoutes = require('./wood.js') //Ce fichier n’existe pas encore.

router.use("/auth", userRoutes)
router.use("/woods", woodRoutes)

module.exports = router