const express = require("express");

const router = express.Router();

const authRoutes = require("../controllers/auth/index");
const adminRoutes = require("../controllers/admin/index");
const userRoutes = require("../controllers/users/index");
const orderRoutes = require("../controllers/orders/index");
const productRoutes = require("../controllers/products/index");

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);

module.exports = router;
