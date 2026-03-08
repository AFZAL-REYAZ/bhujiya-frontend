function logout(req, res) {
  res.clearCookie("token");
  return res.json({ success: true, message: "Logout successful" });
}

module.exports = logout;
