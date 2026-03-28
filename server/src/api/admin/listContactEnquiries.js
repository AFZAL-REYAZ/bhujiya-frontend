const ContactEnquiry = require("../../models/ContactEnquiry");

async function listContactEnquiries(req, res) {
  try {
    const filter = {};
    if (req.query.source) {
      filter.source = req.query.source;
    }
    const enquiries = await ContactEnquiry.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ success: true, enquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = listContactEnquiries;
