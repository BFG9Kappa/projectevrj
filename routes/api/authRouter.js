var express = require("express");
var router = express.Router();

// Require user controller.
const authrouter_controller = require("../../controllers/api/authController");

router.get("/", authrouter_controller.list);
router.get("/all", authrouter_controller.all);
router.delete("/delete/:id", authrouter_controller.delete);
// User Create con problemas
//router.post("/create", authrouter_controller.rules, authrouter_controller.create);
// User Update con problemas
//router.put("/update/:id", authrouter_controller.rules, authrouter_controller.update);

module.exports = router;
