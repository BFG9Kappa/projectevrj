var express = require("express");
var router = express.Router();

const absnoprevista_controller = require("../controllers/api/absnoprevistesController");

router.get("/", absnoprevista_controller.list);

router.get("/all", absnoprevista_controller.all);

router.get("/decresp", absnoprevista_controller.genpdf_get);
router.post("/decresp", absnoprevista_controller.genpdf_post);

router.post("/create", absnoprevista_controller.rules, absnoprevista_controller.create);

router.put("/update/:id", absnoprevista_controller.rules, absnoprevista_controller.update);

router.delete("/delete/:id", absnoprevista_controller.delete);

module.exports = router;
