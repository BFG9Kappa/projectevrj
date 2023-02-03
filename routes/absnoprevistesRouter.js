var express = require("express");
var router = express.Router();

const absnoprevista_controller = require("../controllers/absnoprevistesController");



router.get("/create", absnoprevista_controller.create_get);
router.post("/create", absnoprevista_controller.create_post);

router.get("/", absnoprevista_controller.list);

router.get("/update/:id", absnoprevista_controller.update_get);
router.post("/update/:id", absnoprevista_controller.update_post);

router.get("/delete/:id", absnoprevista_controller.delete_get);
router.post("/delete/:id", absnoprevista_controller.delete_post);

module.exports = router;