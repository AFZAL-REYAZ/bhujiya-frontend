import React from "react";

export default function Terms() {
  const lastUpdated = "October 30, 2025";
  return (
    <section className="mt-24 px-6 md:px-10">
      {/* Hero */}
      <div className="max-w-6xl mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#161616] via-[#121212] to-[#0f0f0f] ring-1 ring-amber-400/25 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold">Terms & Conditions</h1>
        <p className="mt-2 text-sm md:text-base text-amber-100/80">Last updated: {lastUpdated}</p>
      </div>

      <div className="max-w-6xl mx-auto rounded-2xl bg-white/90 backdrop-blur-md shadow-lg ring-1 ring-gray-200 p-6">
        <div className="prose prose-sm md:prose">
          <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
          <p className="text-gray-700">Welcome to Zafar Suits Designer. By accessing or using our website and services, you agree to the following terms and conditions. Please read them carefully.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">2. Orders & Availability</h2>
          <p className="text-gray-700">All orders are subject to acceptance and availability. We may cancel or refuse orders due to stock, quality checks, or pricing errors. Custom requests may require additional processing time.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">3. Pricing & Payments</h2>
          <p className="text-gray-700">Prices are listed in INR and may change without notice. We accept standard payment methods; by submitting payment details, you confirm authorization to use the method provided.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">4. Shipping & Delivery</h2>
          <p className="text-gray-700">We offer delivery across India. Delivery times are estimates and may vary due to location and logistics. You are responsible for providing accurate shipping details.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">5. Returns & Exchanges</h2>
          <p className="text-gray-700">Returns may be accepted within a specified period if the product is unused and in original condition. Custom or tailored items may not be eligible for return. Please contact us to initiate requests.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">6. Tailoring & Customization</h2>
          <p className="text-gray-700">For tailored garments, measurements must be accurate to ensure fit. Alterations may be offered at an additional cost depending on scope. Final approval is required before production.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">7. Care & Maintenance</h2>
          <p className="text-gray-700">Please follow the care instructions provided with your garment. Improper care may affect longevity and finish.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">8. Intellectual Property</h2>
          <p className="text-gray-700">All content, designs, and images on this site are owned or licensed by Zafar Suits Designer and may not be used without prior written permission.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">9. Limitation of Liability</h2>
          <p className="text-gray-700">To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from use of our products or services.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">10. Updates to Terms</h2>
          <p className="text-gray-700">We may update these terms periodically. Continued use of our site after changes constitutes acceptance of the updated terms.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">11. Contact</h2>
          <p className="text-gray-700">For questions regarding these terms, please contact us at <span className="font-medium">zafardesigner339@gmail.com</span> or visit the <a href="/contactus" className="text-amber-600 hover:text-amber-700">Contact Us</a> page.</p>
        </div>
      </div>
    </section>
  );
}