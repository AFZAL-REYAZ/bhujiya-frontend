import React from "react";

export default function Privacy() {
  const lastUpdated = "October 30, 2025";
  return (
    <section className="mt-24 px-6 md:px-10">
      {/* Hero */}
      <div className="max-w-6xl mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#161616] via-[#121212] to-[#0f0f0f] ring-1 ring-amber-400/25 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-sm md:text-base text-amber-100/80">Last updated: {lastUpdated}</p>
      </div>

      <div className="max-w-6xl mx-auto rounded-2xl bg-white/90 backdrop-blur-md shadow-lg ring-1 ring-gray-200 p-6">
        <div className="prose prose-sm md:prose">
          <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
          <p className="text-gray-700">This Privacy Policy describes how Zafar Suits Designer collects, uses, and protects your personal information when you visit our website or interact with our services.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">2. Information We Collect</h2>
          <p className="text-gray-700">We may collect personal details such as your name, email, phone number, and address when you place orders or contact us. We also collect non-personal data like device information and browsing behavior for analytics and site improvements.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">3. How We Use Information</h2>
          <p className="text-gray-700">Your information helps us process orders, provide customer support, improve our products and website, and send updates or promotional messages (only with your consent). We do not sell your personal information.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">4. Cookies & Tracking</h2>
          <p className="text-gray-700">We may use cookies and similar technologies to personalize content, remember preferences, and analyze site performance. You can control cookies through your browser settings.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">5. Third-Party Services</h2>
          <p className="text-gray-700">We may use trusted third-party providers for payments, analytics, or shipping. These providers only receive the information necessary to perform their services and are expected to safeguard your data.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">6. Data Security</h2>
          <p className="text-gray-700">We implement reasonable security measures to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">7. Your Rights</h2>
          <p className="text-gray-700">You may request access to, correction of, or deletion of your personal information. To exercise your rights, please contact us at <span className="font-medium">zafardesigner339@gmail.com</span>.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">8. Children’s Privacy</h2>
          <p className="text-gray-700">Our services are not intended for children under 13. We do not knowingly collect information from children. If you believe a child has provided us data, please contact us for removal.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">9. Changes to This Policy</h2>
          <p className="text-gray-700">We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date. Continued use of our site after changes indicates acceptance.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">10. Contact Us</h2>
          <p className="text-gray-700">For privacy-related questions or requests, contact us at <span className="font-medium">zafardesigner339@gmail.com</span> or via the <a href="/contactus" className="text-amber-600 hover:text-amber-700">Contact Us</a> page.</p>
        </div>
      </div>
    </section>
  );
}