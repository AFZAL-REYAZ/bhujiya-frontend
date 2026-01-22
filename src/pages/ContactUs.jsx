import React, { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
  };

  return (
    <section className="mt-24 px-6 md:px-10">
      {/* Hero */}
      <div className="max-w-6xl mx-auto mb-8 rounded-2xl bg-gray-100 p-8 text-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold">Contact Us</h2>
        <p className="mt-2 text-sm md:text-base text-gray-600">We respond within 24 hours for orders and support.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info cards */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white shadow-md p-5 text-gray-800">
            <div className="flex items-start gap-3">
              <MdLocationOn className="text-green-600 mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Store Address</div>
                <p className="mt-1 text-gray-600">Malsalami, Shahadra, Patna City – 800008<br/>Bihar, India</p>
                <a href="https://maps.google.com/?q=Malsalami%20Shahadra%20Patna%20City%20800008" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-green-600 hover:text-green-700">View on Maps</a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow-md p-5 text-gray-800">
            <div className="flex items-start gap-3">
              <MdPhone className="text-green-600 mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Call Us</div>
                <p className="mt-1 text-gray-600">+91 82527 53985 · +91 73669 81951</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow-md p-5 text-gray-800">
            <div className="flex items-start gap-3">
              <MdEmail className="text-green-600 mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Email</div>
                <p className="mt-1 text-gray-600">maakavitalaxmi@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow-md p-5 text-gray-800">
            <div className="flex items-start gap-3">
              <MdAccessTime className="text-green-600 mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500">Hours</div>
                <p className="mt-1 text-gray-600">Mon–Sun: 10:00 AM – 8:00 PM IST</p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/918252753985"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 text-white px-4 py-3 shadow-lg ring-1 ring-green-400/40 hover:bg-green-600 transition"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp /> <span className="text-sm font-medium">Chat on WhatsApp</span>
          </a>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900">Send a message</h3>
          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">First Name *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder:text-gray-400" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Last Name *</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder:text-gray-400" />
            </div>
            <div className="flex flex-col sm:col-span-2">
              <label className="mb-1 text-gray-700">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder:text-gray-400" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder:text-gray-400" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder:text-gray-400" />
            </div>
            <div className="flex flex-col sm:col-span-2">
              <label className="mb-1 text-gray-700">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder:text-gray-400"></textarea>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="flex-1 px-6 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition">Submit</button>
              <a href="tel:+918252753985" className="px-6 py-3 rounded-full border border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white transition">Call now</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
