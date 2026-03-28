const express = require("express");

const router = express.Router();

const { auth } = require("../../middlewares/auth");

const getProfile = require("../../api/users/getProfile");
const updateAddress = require("../../api/users/updateAddress");

const contactEnquiryRoutes = require("./contactEnquiry");
const cartRoutes = require("./cart");


router.get("/profile", auth, getProfile);
router.put("/address", auth, updateAddress);


router.use("/contact-enquiry", contactEnquiryRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
