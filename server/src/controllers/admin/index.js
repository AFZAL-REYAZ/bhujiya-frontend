const express = require("express");

const router = express.Router();

const { auth, allowRoles } = require("../../middlewares/auth");
const getDashboardStats = require("../../api/admin/getDashboardStats");
const listAllUsers = require("../../api/admin/listAllUsers");

router.get("/dashboard-stats", auth, allowRoles("admin"), getDashboardStats);
router.get("/users", auth, allowRoles("admin"), listAllUsers);

module.exports = router;
