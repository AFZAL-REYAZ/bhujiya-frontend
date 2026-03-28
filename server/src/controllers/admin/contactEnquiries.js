const listContactEnquiries = require("../../api/admin/listContactEnquiries");

const express = require("express");
const router = express.Router();

// ...existing code...

router.get("/", listContactEnquiries);

module.exports = router;
