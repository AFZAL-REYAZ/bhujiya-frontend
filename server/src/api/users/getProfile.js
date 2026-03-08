async function getProfile(req, res) {
  return res.json({ success: true, profile: req.user });
}

module.exports = getProfile;
