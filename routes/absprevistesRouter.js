var express = require("express");
var router = express.Router();

const absprevista_controller = require("../controllers/absprevistesController");

//router.get("/", absnoprevista_controller.list);

router.get("/create", absprevista_controller.create_get);
router.post("/create", absprevista_controller.create_post);

/*
router.get("/delete/:id", absnoprevista_controller.delete_get);
router.post("/delete/:id", absnoprevista_controller.delete_post);

router.get("/update/:id", absnoprevista_controller.update_get);
router.post("/update/:id", absnoprevista_controller.update_post);
*/

module.exports = router;