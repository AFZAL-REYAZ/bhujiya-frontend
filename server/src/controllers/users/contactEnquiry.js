const createContactEnquiry = require("../../api/users/createContactEnquiry");

const express = require("express");
const router = express.Router();

// ...existing code...

router.post("/", createContactEnquiry);

module.exports = router;
