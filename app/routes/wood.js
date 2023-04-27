require("dotenv").config();
const express = require("express");
const router = express.Router();
const woodCtrl = require("../controllers/wood.js");
const auth = require("../middleware/auth.js")
let multer  = require('../middleware/multer-s3.js')
if (process.env.NODE_ENV !== 'production') {
    multer  = require('../middleware/multer-local.js')
}

router.get("/", auth, woodCtrl.readAll);
router.get("/:hardnessId", auth, woodCtrl.readByHardness);
router.post("/", auth, multer.single("image"), woodCtrl.create);
router.put("/:id", auth, multer.single("image"), woodCtrl.update);
router.delete("/:id", auth, woodCtrl.delete);

module.exports = router;
