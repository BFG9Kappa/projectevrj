var express = require("express");
var router = express.Router();

const baixamedica_controller = require("../controllers/baixesmediquesController");

router.get("/", baixamedica_controller.list);

router.get("/create", baixamedica_controller.create_get);
router.post("/create", baixamedica_controller.rules, baixamedica_controller.create_post);


router.get("/delete/:id", baixamedica_controller.delete_get);
router.post("/delete/:id", baixamedica_controller.delete_post);

router.get("/update/:id", baixamedica_controller.update_get);
router.post("/update/:id", baixamedica_controller.update_post);


module.exports = router;
