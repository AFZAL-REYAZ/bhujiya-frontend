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
    <footer className="bg-brand-yellow text-gray-900 mt-auto relative overflow-hidden">

      {/* subtle animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)] animate-fadeInSlow" />

      {/* ================= TOP QUALITY BAR ================= */}
      <div className="relative border-b border-yellow-500/30 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {[
            "From our advanced oil extracting facility to your snack bowl",
            "Every chip and bhujiya meets 100% standardized quality",
            "Hygienic & quality-controlled processing",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 justify-center md:justify-start group"
            >
              <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition">
                <FaCheckCircle className="text-brand-green text-sm animate-pulseSlow" />
              </div>
              <p className="text-sm font-medium leading-relaxed group-hover:translate-x-1 transition">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="relative max-w-7xl mx-auto px-6 py-14 animate-slideUp">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="inline-block bg-white px-4 py-2 rounded shadow hover:scale-105 transition">
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
            <a
              href="tel:+918252753985"
              className="block text-base text-brand-green hover:translate-x-1 transition hover:text-red-600"
            >
            +91 82527 53985
            </a>

            <a
              href="tel:+917366981951"
              className="block text-base text-brand-green hover:translate-x-1 transition hover:text-red-600"
            >
            +91 73669 81951
            </a>


            <a
              href="https://www.google.com/maps?q=Malsalami+Shahadra+Patna+City+800008"
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-start gap-3 text-sm leading-relaxed hover:text-red-600 transition"
            >
              <MdLocationOn className="text-lg mt-0.5 animate-bounceSlow" />
              <p>
                Malsalami, Shahadra, Patna City – 800008 <br />
                Bihar, India
              </p>
            </a>

           <a
  href="mailto:maakavitalaxmi@gmail.com"
  className="mt-3 flex items-center gap-3 text-sm hover:text-red-600 transition"
>
  <MdEmail className="text-lg" />
  <p>maakavitalaxmi@gmail.com</p>
</a>


            {/* GOOGLE MAP */}
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border">
              <iframe
                title="location-map"
                src="https://maps.google.com/maps?q=Patna%20City%20800008&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-32"
                loading="lazy"
              />
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="bg-yellow-600 text-white text-center py-4 text-xs sm:text-sm tracking-wide">
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
      <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider relative after:block after:h-[2px] after:w-8 after:bg-red-600 after:mt-1">
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
      className="block relative w-fit hover:text-red-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-600 hover:after:w-full after:transition-all"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon, color }) {
  return (
    <a
      href="#"
      className={`h-9 w-9 inline-flex items-center justify-center rounded-full bg-white shadow-md ${color}
      hover:scale-110 hover:shadow-xl transition-all relative overflow-hidden`}
    >
      <span className="absolute inset-0 bg-white opacity-20 scale-0 hover:scale-150 transition-transform rounded-full" />
      {icon}
    </a>
  );
}
