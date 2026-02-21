import React, { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for reaching out. We will get back to you shortly.");
  };

  const faqs = [
    {
      question: "What are your delivery options?",
      answer:
        "We offer pan-India delivery with standard and express options. Free shipping is available above selected order values.",
    },
    {
      question: "Do you have minimum order quantities?",
      answer:
        "For retail orders there is no strict minimum. Wholesale and B2B orders may have an MOQ depending on products.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 7 days if the product is damaged or defective. Please share order details with our support.",
    },
    {
      question: "Can I customize products for corporate gifting?",
      answer:
        "Yes, we offer curated gift packs and branding options for corporate and festive gifting. Contact our team for details.",
    },
  ];

  return (
    <section className="mt-24 bg-[#F4F0E6] pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center py-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0b3b2a]">
            Get In Touch
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            We would love to hear from you. Send us a message and we will respond as
            soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start bg-white rounded-3xl px-6 sm:px-8 py-8 shadow-sm border border-[#E5D7C3]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#0b3b2a]">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0b3b2a]"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0b3b2a]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0b3b2a]"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0b3b2a]"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0b3b2a] resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-[#0b3b2a] text-white text-sm font-semibold px-6 py-3.5 hover:bg-[#0b3b2a] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-[#F7F1E6] px-5 py-4 border border-[#E5D7C3]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b3b2a] text-white">
                  <MdLocationOn />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3b2a]">
                    Address
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Malsalami, Shahadra, Patna City – 800008
                    <br />
                    Bihar, India
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F1E6] px-5 py-4 border border-[#E5D7C3]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b3b2a] text-white">
                  <MdPhone />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3b2a]">
                    Phone
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    +91 82527 53985
                    <br />
                    +91 73669 81951
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F1E6] px-5 py-4 border border-[#E5D7C3]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b3b2a] text-white">
                  <MdEmail />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3b2a]">
                    Email
                  </p>
                  <p className="mt-1 text-sm text-gray-700">maakavitalaxmi@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F1E6] px-5 py-4 border border-[#E5D7C3]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b3b2a] text-white">
                  <MdAccessTime />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3b2a]">
                    Business Hours
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Monday – Sunday
                    <br />
                    10:00 AM – 8:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a]">
            Visit Our Kitchen
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Come see where the magic happens.
          </p>
          <div className="mt-6 w-full rounded-3xl bg-[#E1DED6] h-52 sm:h-64 flex flex-col items-center justify-center text-gray-600 text-sm">
            <span className="mb-2 font-medium">Map Placeholder</span>
            <span className="text-xs">
              Rudraksha Kitchen, Malsalami, New Market Road, Kerala
            </span>
          </div>
        </div>

        <div className="mt-16 w-full rounded-3xl bg-[#F7F1E6] px-6 sm:px-8 py-10 border border-[#E5D7C3]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a] text-center">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-2xl mx-auto">
            Find quick answers to common questions about delivery, orders and returns.
          </p>
          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl bg-white px-4 sm:px-5 py-4 text-left text-sm text-gray-800 border border-[#E5D7C3]"
              >
                <p className="font-semibold text-[#0b3b2a]">{item.question}</p>
                <p className="mt-1 text-xs text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
