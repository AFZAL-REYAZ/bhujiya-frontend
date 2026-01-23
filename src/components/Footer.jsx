import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaCheckCircle,
} from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FFF6D6] text-gray-900 mt-auto relative">

      {/* ================= TRUST BAR ================= */}
      <div className="border-b border-yellow-300/40">
        <div className="max-w-7xl mx-auto px-6 py-6
                        grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {[
            "From our advanced oil extracting facility to your snack bowl",
            "Every product meets strict quality standards",
            "Hygienic & quality-controlled processing",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <FaCheckCircle className="text-green-600 text-sm" />
              <p className="leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-bold text-red-700">
              Maa Kavita Lakxmi Pvt. Ltd.
            </h3>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Authentic taste, pure ingredients, and trusted crunch —
              proudly serving quality snacks since 2024.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaYoutube />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <FooterColumn title="Quick Links">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/products">Products</FooterLink>
            <FooterLink to="/contactus">Contact Us</FooterLink>
            <FooterLink to="/locate">Store Locator</FooterLink>
          </FooterColumn>

          {/* POLICIES */}
          <FooterColumn title="Policies">
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms & Conditions</FooterLink>
            <FooterLink to="/shipping">Shipping Policy</FooterLink>
            <FooterLink to="/refund">Refund Policy</FooterLink>
          </FooterColumn>

          {/* CONTACT */}
          <FooterColumn title="Customer Support">
            <a
              href="tel:+918252753985"
              className="block text-sm text-gray-800 hover:text-red-600 transition"
            >
              +91 82527 53985
            </a>

            <a
              href="tel:+917366981951"
              className="block text-sm text-gray-800 hover:text-red-600 transition"
            >
              +91 73669 81951
            </a>

            <a
              href="https://www.google.com/maps?q=Malsalami+Shahadra+Patna+City+800008"
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-start gap-3 text-sm text-gray-700 hover:text-red-600 transition"
            >
              <MdLocationOn className="text-lg mt-0.5" />
              <p>
                Malsalami, Shahadra, Patna City – 800008 <br />
                Bihar, India
              </p>
            </a>

            <a
              href="mailto:maakavitalaxmi@gmail.com"
              className="mt-3 flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition"
            >
              <MdEmail className="text-lg" />
              <span>maakavitalaxmi@gmail.com</span>
            </a>
          </FooterColumn>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="bg-yellow-500 text-white text-center py-4 text-xs sm:text-sm">
        © {new Date().getFullYear()} Maa Kavita Lakxmi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

/* ================= REUSABLE ================= */

function FooterColumn({ title, children }) {
  return (
    <div>
      <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
        {title}
        <span className="block h-[2px] w-8 bg-red-600 mt-1" />
      </h6>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block text-sm text-gray-700 hover:text-red-600 transition"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon }) {
  return (
    <a
      href="#"
      className="h-9 w-9 inline-flex items-center justify-center
                 rounded-full border border-gray-300 text-gray-700
                 hover:bg-red-600 hover:text-white hover:border-red-600
                 transition"
    >
      {icon}
    </a>
  );
}
