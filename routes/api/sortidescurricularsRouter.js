var express = require("express");
var router = express.Router();

const sortidacurricular_controller = require("../../controllers/api/sortidescurricularsController");

router.get("/all", sortidacurricular_controller.all);
router.get("/", sortidacurricular_controller.list);
router.delete("/delete/:id", sortidacurricular_controller.delete);
router.post("/create", sortidacurricular_controller.rules, sortidacurricular_controller.create);
router.put("/update/:id", sortidacurricular_controller.rules, sortidacurricular_controller.update);

module.exports = router;
