const User = require("../../models/User");

async function updateProfile(req, res) {
  try {
    const { name, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(name ? { name } : {}),
        ...(address ? { address } : {}),
      },
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = updateProfile;
