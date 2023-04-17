var express = require("express");
var router = express.Router();

const absprevista_controller = require("../../controllers/api/absprevistesController");

router.get("/all", absprevista_controller.all);
router.get("/", absprevista_controller.list);
router.post("/create", absprevista_controller.rules, absprevista_controller.create);
router.delete("/delete/:id", absprevista_controller.delete);
router.put("/update/:id", absprevista_controller.rules, absprevista_controller.update);

module.exports = router;
