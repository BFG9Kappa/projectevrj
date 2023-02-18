var express = require("express");
var router = express.Router();

const usuari_controller = require("../controllers/usuariController");

/*
router.get("/", usuari_controller.list);
router.get("/create", usuari_controller.create_get);
router.post("/create", usuari_controller.create_post);
router.get("/delete/:id", usuari_controller.delete_get);
router.post("/delete/:id", usuari_controller.delete_post);
router.get("/update/:id", usuari_controller.update_get);
router.post("/update/:id", usuari_controller.update_post);
*/

module.exports = router;
