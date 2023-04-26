const express = require("express");
const router = express.Router();
const woodCtrl = require("../controllers/wood.js");
const auth = require("../middleware/auth.js")
const multer  = require('../middleware/multer.js')

router.get("/", auth, woodCtrl.readAll);
router.get("/:hardnessId", auth, woodCtrl.readByHardness);
router.post("/", auth, multer, woodCtrl.create);
router.put("/:id", auth, multer, woodCtrl.update);
router.delete("/:id", auth, woodCtrl.delete);

module.exports = router;
