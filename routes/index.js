const express = require("express");
const { shorten, redirect } = require("../controllers/shorten");
const router = express.Router();

router.post("/shorten", shorten);
router.get("/:shortId", redirect);

module.exports = router;
