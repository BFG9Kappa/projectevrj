var express = require("express");
var router = express.Router();

const sortidacurricular_controller = require("../../controllers/api/sortidescurricularsController");
const checkAuth = require('../../middlewares/auth');
const checkRoleAuth = require('../../middlewares/roleAuth');

router.get("/all", checkAuth, checkRoleAuth(['professor','administrador']), sortidacurricular_controller.all);
//router.post("/create", checkAuth, checkRoleAuth(['professor','administrador']),sortidacurricular_controller.rules, sortidacurricular_controller.create);

//router.get("/all", sortidacurricular_controller.all);
router.get("/", sortidacurricular_controller.list);
router.delete("/delete/:id", sortidacurricular_controller.delete);
router.post("/create", sortidacurricular_controller.rules, sortidacurricular_controller.create);
router.put("/update/:id", sortidacurricular_controller.rules, sortidacurricular_controller.update);
router.post("/duplicar/:id", sortidacurricular_controller.rules, sortidacurricular_controller.duplicar);

module.exports = router;
