var express = require("express");
var router = express.Router();

const absprevista_controller = require("../../controllers/api/absprevistesController");

router.get("/", absprevista_controller.list);

router.get("/all", absprevista_controller.all);

router.get("/decresp", absprevista_controller.genpdf_get);
router.post("/decresp", absprevista_controller.genpdf_post);

router.get("/create", absprevista_controller.create_get);
router.post("/create", absprevista_controller.rules, absprevista_controller.create_post);

router.get("/update/:id", absprevista_controller.update_get);
router.post("/update/:id", absprevista_controller.update_post);

router.get("/delete/:id", absprevista_controller.delete_get);
router.post("/delete/:id", absprevista_controller.delete_post);

module.exports = router;
