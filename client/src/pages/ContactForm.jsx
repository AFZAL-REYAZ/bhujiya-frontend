import React, { useState } from "react";
import { submitContactEnquiry } from "../utils/contactApi";
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", requirement: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.requirement) {
      setStatus({ type: "error", message: "Please fill Name, Phone and Requirement." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await submitContactEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.requirement,
        source: "contactus",
      });
      
      setStatus({ type: "success", message: "Thank you! Your message has been saved. Our team will contact you shortly." });
      setForm({ name: "", phone: "", requirement: "", email: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    } catch (error) {
      console.error("Contact Form Submission Error:", error);
      setStatus({ 
        type: "error", 
        message: "Failed to send message. Please check your internet or call us directly." 
      });
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

            {/* Contact Details */}
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
                <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                  maakavitalaxmi@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="pt-4">
            <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-widest">Connect with us</p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/people/Maa-Kavita-Laxmi-Pvt-Ltd/61584024615846/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://x.com/yourpage"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:bg-black hover:text-white transition-all transform hover:-translate-y-1"
              >
                <FaTwitter size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl max-w-sm w-full relative overflow-hidden">
            
            {/* Form Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                Send Message
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                Share your requirements. We respond within 24 hours.
              </p>
            </div>

            {/* Status Messages */}
            {status.message && (
              <div className={`mb-5 p-3 rounded-xl text-xs font-bold border flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300 ${
                status.type === "success" 
                  ? "bg-green-50 border-green-200 text-green-700" 
                  : "bg-red-50 border-red-200 text-red-700"
              }`}>
                {status.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your requirement</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Need 200kg wholesale chips..."
                  className="w-full p-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all resize-none"
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm leading-none"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 ..."
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm leading-none"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email <span className="opacity-50">(optional)</span></label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm leading-none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition shadow-lg shadow-green-600/20 disabled:opacity-60 active:scale-95 duration-200"
              >
                {submitting ? "Processing..." : <>Send Enquiry <FaPaperPlane size={14}/></>}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;