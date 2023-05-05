var express = require("express");
var router = express.Router();

const baixamedica_controller = require("../../controllers/api/baixesmediquesController");

const checkAuth = require('../../middlewares/auth');
const checkRoleAuth = require('../../middlewares/roleAuth');

router.get("/all", checkAuth, checkRoleAuth(['professor','administrador']), baixamedica_controller.all);

//router.get("/all", baixamedica_controller.all);
router.get("/", baixamedica_controller.list);
router.delete("/delete/:id", baixamedica_controller.delete);
router.post("/create", baixamedica_controller.rules, baixamedica_controller.create);
router.put("/update/:id", baixamedica_controller.rules, baixamedica_controller.update);


module.exports = router;
