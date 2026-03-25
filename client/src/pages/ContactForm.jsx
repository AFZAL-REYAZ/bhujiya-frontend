import React, { useState } from "react";
import { sendEmail } from "../utils/email"; 
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter,
  FaPaperPlane,
} from "react-icons/fa";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", requirement: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.requirement) {
      alert("Please fill Name, Phone and Requirement.");
      return;
    }

    setSubmitting(true);
    try {
      const emailSent = await sendEmail({
        subject: `New Business Enquiry from ${form.name}`,
        message: form.requirement,
        fromName: form.name,
        fromEmail: form.email,
        phone: form.phone,
      });

      if (emailSent) {
        alert("Enquiry Sent! We will contact you shortly.");
        setForm({ name: "", phone: "", requirement: "", email: "" });
      }
    } catch (error) {
      alert("Error sending message. Please try calling us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-green-50 py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 space-y-8 text-slate-800">

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Contact <span className="text-green-600">Us</span>
            </h1>
            <div className="h-1 w-14 bg-green-500 rounded-full"></div>
            <p className="text-gray-600 text-sm">
              Have questions about our products or bulk orders? Reach out to us anytime.
            </p>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FaMapMarkerAlt className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-600">Our Location</p>
                <h3 className="text-base font-semibold">Maa Kavita Laxmi Pvt. Ltd.</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  GROUND FLOOR, Simli Sardra, Yadav Building, Simali Murarpur Tola,
                  Malsalami, Patna, Bihar, 800008
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaPhoneAlt className="text-blue-600 text-sm" />
                </div>
                <p className="text-sm font-medium text-gray-700">+91-8492995999</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaPhoneAlt className="text-blue-600 text-sm" />
                </div>
                <p className="text-sm font-medium text-gray-700">+91-8446788999</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-lg">
                  <FaEnvelope className="text-red-500 text-sm" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  maakavitalaxmi@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="pt-4">
            <p className="text-xs text-gray-500 mb-2">Connect with us</p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/people/Maa-Kavita-Laxmi-Pvt-Ltd/61584024615846/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://x.com/yourpage"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <FaTwitter size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-md max-w-sm w-full">

            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              Send Message
            </h2>
            <p className="text-gray-500 text-xs mb-4">
              We respond within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">

              <textarea
                rows="3"
                placeholder="Your requirement..."
                className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white outline-none text-sm"
                value={form.requirement}
                onChange={(e) => setForm({ ...form, requirement: e.target.value })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <input
                type="email"
                placeholder="Email (optional)"
                className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition shadow-sm"
              >
                {submitting ? "Processing..." : <>Send <FaPaperPlane size={12}/></>}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;