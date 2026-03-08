const express = require("express");

const router = express.Router();

const authRoutes = require("../controllers/auth/index");
const adminRoutes = require("../controllers/admin/index");
const userRoutes = require("../controllers/users/index");

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/users", userRoutes);

module.exports = router;
