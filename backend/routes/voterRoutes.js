const express = require("express");
const router = express.Router();
const { registerVoter } = require("../controllers/voterController");

router.post("/register", registerVoter);

module.exports = router;
