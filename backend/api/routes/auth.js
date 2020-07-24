const express = require("express");

const authControler = require("../controllers/auth");

const router = express.Router();

router.post("/signup", authControler.signupCB);

router.post("/login", authControler.loginCB);

module.exports = router;
