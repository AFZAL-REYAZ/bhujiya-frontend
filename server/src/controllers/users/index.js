const express = require("express");

const router = express.Router();

const { auth } = require("../../middlewares/auth");

const getProfile = require("../../api/users/getProfile");
const updateAddress = require("../../api/users/updateAddress");
const cartRoutes = require("./cart");


router.get("/profile", auth, getProfile);
router.put("/address", auth, updateAddress);

router.use("/cart", cartRoutes);

module.exports = router;
