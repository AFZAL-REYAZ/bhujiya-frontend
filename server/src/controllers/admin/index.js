const express = require("express");

const router = express.Router();

const { auth, allowRoles } = require("../../middlewares/auth");
const getDashboardStats = require("../../api/admin/getDashboardStats");
const listAllUsers = require("../../api/admin/listAllUsers");
const listOrders = require("../../api/admin/listOrders");

const isDev = process.env.NODE_ENV !== "production";
const adminOpenAccess = process.env.ADMIN_OPEN_ACCESS === "true" || isDev;

if (adminOpenAccess) {
  router.get("/dashboard-stats", getDashboardStats);
  router.get("/users", listAllUsers);
  router.get("/orders", listOrders);
} else {
  router.get("/dashboard-stats", auth, allowRoles("admin"), getDashboardStats);
  router.get("/users", auth, allowRoles("admin"), listAllUsers);
  router.get("/orders", auth, allowRoles("admin"), listOrders);
}

module.exports = router;
