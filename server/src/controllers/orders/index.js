const express = require("express");

const router = express.Router();

const createQuote = require("../../api/orders/createQuote");

router.post("/quote", createQuote);

module.exports = router;
