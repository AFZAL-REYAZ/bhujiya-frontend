const express = require("express");

const router = express.Router();

const signup = require("../../api/auth/signup");
const login = require("../../api/auth/login");
const logout = require("../../api/auth/logout");
const me = require("../../api/auth/me");
const updateProfile = require("../../api/auth/updateProfile");
const googleAuth = require("../../api/auth/googleAuth");
const { auth } = require("../../middlewares/auth");

// GOOGLE AUTH ROUTE
router.post("/google", googleAuth);

// PROTECTED ROUTE - UPDATE PROFILE
router.put("/update-profile", auth, updateProfile);

// AUTH ROUTES
router.get("/me", auth, me);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
