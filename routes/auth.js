const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");

router.get("/", controller.wsRes);
router.post("/register/", controller.register);
router.post("/login/", controller.logIn);

module.exports = router;
