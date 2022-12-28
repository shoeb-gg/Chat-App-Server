const express = require("express");
const router = express.Router();

const controller = require("../controllers/texts");
const userTokenVerification = require("../middleware/check-user-token");

router.get("/", userTokenVerification.verifyToken, controller.sampleText);

module.exports = router;
