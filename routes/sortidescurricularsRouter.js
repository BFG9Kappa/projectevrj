var express = require("express");
var router = express.Router();

const sortidacurricular_controller = require("../controllers/sortidescurricularsController");

router.get("/", sortidacurricular_controller.list);

//router.get("/", sortidacurricular_controller.list);

router.get("/create", sortidacurricular_controller.create_get);
router.post("/create", sortidacurricular_controller.rules, sortidacurricular_controller.create_post);

router.get("/delete/:id", sortidacurricular_controller.delete_get);
router.post("/delete/:id", sortidacurricular_controller.delete_post);

router.get("/update/:id", sortidacurricular_controller.update_get);
router.post("/update/:id", sortidacurricular_controller.rules, sortidacurricular_controller.update_post);

router.get("/duplicar/:id", sortidacurricular_controller.duplicar_get);
router.post("/duplicar/:id", sortidacurricular_controller.duplicar_post);

module.exports = router;
