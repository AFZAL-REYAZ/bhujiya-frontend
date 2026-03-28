const ContactEnquiry = require("../../models/ContactEnquiry");

async function createContactEnquiry(req, res) {
  try {
    const { name, phone, email, message, source } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "Name, phone, and message are required." });
    }
    const enquiry = await ContactEnquiry.create({ name, phone, email, message, source });
    return res.status(201).json({ success: true, enquiry });
  } catch (error) {
    console.error("[ContactEnquiry API Error]", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = createContactEnquiry;
