var express = require("express");
var router = express.Router();

const horari_controller = require("../controllers/api/horariController");

router.get("/", horari_controller.list);
router.get("/all", horari_controller.all);
router.get("/create", horari_controller.create_get);
router.post("/create", horari_controller.create_post);
router.get("/update/:id", horari_controller.update_get);
router.post("/update/:id", horari_controller.update_post);
router.get("/delete/:id", horari_controller.delete_get);
router.post("/delete/:id", horari_controller.delete_post);

module.exports = router;
