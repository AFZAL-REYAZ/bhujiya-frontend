const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// ================= SIGNUP =================
async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
      role: role || "user",
    });

    return res.json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = signup;
