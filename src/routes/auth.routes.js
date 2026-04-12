const router = require("express").Router();
// Controllers
const controller = require("../controllers/auth.controller");

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);

module.exports = router;
