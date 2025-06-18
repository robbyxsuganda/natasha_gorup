const express = require("express");
const router = express.Router();
const Controller = require("../controller/Controller.js");
const errorHandler = require("../middlewares/errorHandler.js");

router.post("/mahasiswa", Controller.create);
router.get("/mahasiswa", Controller.getAverageNilai);
router.put("/mahasiswa/:id", Controller.update);
router.delete("/mahasiswa/:id", Controller.delete);

router.use(errorHandler);

module.exports = router;
