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
    <footer className="bg-brand-yellow text-gray-900 mt-auto">

      {/* ================= TOP QUALITY BAR ================= */}
      <div className="border-b border-yellow-500/20 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {[
            "From our advanced oil extracting facility to your snack bowl",
            "Every chip and bhujiya meets 100% standardized quality",
            "Hygienic & quality-controlled processing",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <FaCheckCircle className="text-brand-green text-sm" />
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="inline-block bg-white px-3 py-2 rounded shadow-sm">
              <h3 className="text-lg font-bold tracking-tight text-red-600">
                Maa Kavita Lakxmi
              </h3>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-800">
              Authentic taste, pure ingredients, and trusted crunch —
              proudly serving quality snacks since 2024.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon icon={<FaFacebookF />} color="text-blue-600" />
              <SocialIcon icon={<FaYoutube />} color="text-red-600" />
              <SocialIcon icon={<FaInstagram />} color="text-pink-600" />
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
            <p className="text-base  text-brand-green">
              +91 82527 53985
            </p>
            <p className="text-base  text-brand-green">
              +91 73669 81951
            </p>

            <div className="mt-3 flex items-start gap-3 text-sm leading-relaxed">
              <MdLocationOn className="text-lg mt-0.5" />
              <p>
                Malsalami, Shahadra, Patna City – 800008 <br />
                Bihar, India
              </p>
            </div>

            <div className="mt-3 flex items-center gap-3 text-sm">
              <MdEmail className="text-lg" />
              <p>maakavitalaxmi@gmail.com</p>
            </div>
          </FooterColumn>

        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="bg-yellow-600 text-white text-center py-4 text-xs sm:text-sm">
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
      <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider">
        {title}
      </h6>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block hover:text-white transition"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon, color }) {
  return (
    <a
      href="#"
      className={`h-9 w-9 inline-flex items-center justify-center rounded-full bg-white shadow-sm ${color} hover:scale-105 transition`}
    >
      {icon}
    </a>
  );
}
