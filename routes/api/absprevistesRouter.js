var express = require("express");
var router = express.Router();

const absprevista_controller = require("../../controllers/api/absprevistesController");
const checkAuth = require('../../middlewares/auth');
const checkRoleAuth = require('../../middlewares/roleAuth');

router.get("/all", checkAuth, checkRoleAuth(['professor','administrador']), absprevista_controller.all);

//router.post("/create", checkAuth, checkRoleAuth(['professor','administrador']),absprevista_controller.rules, absprevista_controller.create);

//router.get("/all", absprevista_controller.all);
router.get("/", absprevista_controller.list);
router.post("/create", absprevista_controller.rules, absprevista_controller.create);
router.delete("/delete/:id", absprevista_controller.delete);
router.put("/update/:id", absprevista_controller.rules, absprevista_controller.update);

module.exports = router;
