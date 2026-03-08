const User = require("../../models/User");

async function getDashboardStats(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = getDashboardStats;
