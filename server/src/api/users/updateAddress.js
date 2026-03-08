const User = require("../../models/User");

async function updateAddress(req, res) {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, { address }, { new: true }).select(
      "-password"
    );

    return res.json({ success: true, message: "Address updated", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = updateAddress;