const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Placeholder Google auth endpoint that can later verify Google token on server.
async function googleAuth(req, res) {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        role: "user",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Google auth successful", token, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = googleAuth;
