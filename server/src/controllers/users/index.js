const express = require("express");

const router = express.Router();

const { auth } = require("../../middlewares/auth");
const getProfile = require("../../api/users/getProfile");
const updateAddress = require("../../api/users/updateAddress");

router.get("/profile", auth, getProfile);
router.put("/address", auth, updateAddress);

module.exports = router;
