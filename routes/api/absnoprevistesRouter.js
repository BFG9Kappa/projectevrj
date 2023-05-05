var express = require("express");
var router = express.Router();

const absnoprevista_controller = require("../../controllers/api/absnoprevistesController");
const checkAuth = require('../../middlewares/auth');
const checkRoleAuth = require('../../middlewares/roleAuth');

router.get("/all", checkAuth, checkRoleAuth(['professor','administrador']), absnoprevista_controller.all);

router.get("/", absnoprevista_controller.list);
//router.get("/all", absnoprevista_controller.all);
router.post("/create", absnoprevista_controller.rules, absnoprevista_controller.create);
router.delete("/delete/:id", absnoprevista_controller.delete);
router.put("/update/:id", absnoprevista_controller.update);

module.exports = router;
