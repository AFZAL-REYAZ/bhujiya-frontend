import React from "react";
import { MdCheckCircle } from "react-icons/md";
import cert1 from "../assets/certificate/cert1.png";
import cert2 from "../assets/certificate/cert2.png";
import cert3 from "../assets/certificate/cert3.png";
import cert4 from "../assets/certificate/cert4.png";
import cert5 from "../assets/certificate/cert5.png";

export default function About() {
  return (
    <section className="mt-24 pt-16 bg-gray-50">
      
      {/* Hero */}
      <div className="max-w-6xl mx-auto mb-16 rounded-2xl bg-white border border-gray-200 p-10 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          About Us
        </h1>
        <p className="mt-4 text-base text-gray-600 max-w-3xl leading-relaxed">
          We are a trusted food manufacturing brand committed to delivering
          high-quality, hygienic, and authentic traditional snacks made from
          premium ingredients. Our focus is on safety, purity, and taste.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center mb-20 px-4">
        
        {/* Left Text */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">
            Our Commitment to Quality & Safety
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            From sourcing raw materials to final packaging, every step of our
            production process follows strict quality control and hygiene
            standards. Our products are manufactured under supervised
            conditions and comply with government food safety norms.
          </p>

          <ul className="space-y-4">
            {[
              "Certified Food Safety Supervisor",
              "Registered MSME Enterprise",
              "Approved by Bihar Department of Health & Family Welfare",
              "Government Form-C Certified",
              "Hygienic Manufacturing & Packaging",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-800"
              >
                <MdCheckCircle
                  className="text-green-600 mt-1 shrink-0"
                  size={20}
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white">
          <img
            src={cert1}
            alt="Food Manufacturing Certificate"
            className="w-full h-[360px] object-contain p-6"
          />
        </div>
      </div>

      {/* Certifications Section */}
      <div className="max-w-6xl mx-auto mb-24 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-12">
          Our Certifications & Approvals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              title: "Food Safety Supervisor Certificate",
              img: cert2,
            },
            {
              title: "MSME Registration Certificate",
              img: cert4,
            },
            {
              title: "Bihar Govt Health Department Approval",
              img: cert3,
            },
            {
              title: "Form-C Government Certificate",
              img: cert5,
            },
          ].map((cert, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-t-xl p-4">
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 text-center border-t">
                <h3 className="text-sm font-medium text-gray-800">
                  {cert.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          * Certificates shown are for representation purposes only.
        </p>
      </div>
    </section>
  );
}
