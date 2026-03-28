const mongoose = require("mongoose");

const contactEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, enum: ["contactus", "order", "b2b"], default: "contactus" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactEnquiry", contactEnquirySchema);
