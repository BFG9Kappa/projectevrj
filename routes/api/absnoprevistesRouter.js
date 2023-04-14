var express = require("express");
var router = express.Router();

const absnoprevista_controller = require("../../controllers/api/absnoprevistesController");

router.get("/", absnoprevista_controller.list);



module.exports = router;
