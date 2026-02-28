import React, { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";
import ContactForm from "../components/ContactForm";

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

        <ContactForm/>

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
