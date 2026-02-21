import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b3b2a] text-[#e4f3ea] mt-16 relative">
      <div className="max-w-6xl mx-auto px-6 py-12 border-b border-white/10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Maa Kavita Lakxmi
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Authentic homemade banana chips and traditional snacks, crafted with
              love and delivered fresh to your doorstep.
            </p>
            <div className="flex gap-3">
              <SocialIcon>
                <FaFacebookF size={14} />
              </SocialIcon>
              <SocialIcon>
                <FaInstagram size={14} />
              </SocialIcon>
              <SocialIcon>
                <FaTwitter size={14} />
              </SocialIcon>
              <SocialIcon>
                <FaWhatsapp size={14} />
              </SocialIcon>
            </div>
          </div>

          <FooterColumn title="Quick Links">
            <FooterLink to="/">Home</FooterLink><br/>
            <FooterLink to="/ProductDetail">All Products</FooterLink><br/>
            <FooterLink to="/b2b">Wholesale</FooterLink><br/>
            <FooterLink to="/about">About Us</FooterLink><br/>
            <FooterLink to="/contactus">Contact Us</FooterLink>
          </FooterColumn>

          <FooterColumn title="Categories">
            <span className="footer-link">Banana Chips</span><br/>
            <span className="footer-link">Traditional Snacks</span><br/>
            <span className="footer-link">Spice Powders</span><br/>
            <span className="footer-link">Packaged Items</span><br/>
            <span className="footer-link">Seasonal Specials</span>
          </FooterColumn>

          <FooterColumn title="Direct Contact">
            {/* <p className="text-sm text-emerald-100/90">
              For immediate assistance, reach out to our B2B team using the details below.
            </p> */}
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Call / WhatsApp
                </p>
                <a href="tel:+918252753850" className="footer-link block mt-1"><FaPhoneAlt size={12}/> +91 9142514241</a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Email
                </p>
                <a href="mailto:maakavitalaxmi@gmail.com" className="footer-link block mt-1"><FaEnvelope size={12}/> maakavitalaxmi@gmail.com</a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Office Address
                </p>
                <p className="text-sm text-emerald-100 mt-1 flex items-center gap-2"><FaMapMarkerAlt size={12}/> Maa Kavita Lakxmi Pvt. Ltd.</p>
                <p className="text-sm text-emerald-100 pl-4">Kerala, India</p>
              </div>
            </div>
          </FooterColumn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100/80">
        <p>
          © {new Date().getFullYear()} Maa Kavita Lakxmi Pvt. Ltd. All rights
          reserved.
        </p>
        <div className="flex gap-6">
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <span className="footer-link">Shipping Policy</span>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => {
  return (
    <div>
      <h4 className="text-xs font-bold text-white uppercase tracking-[0.18em] mb-2">{title}</h4>
      <div className="h-0.5 w-10 bg-emerald-400/60 rounded mb-4" />
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
};

const FooterLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="footer-link"
    >
      {children}
    </Link>
  );
};

const SocialIcon = ({ children }) => {
  return (
    <a
      href="#"
      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-emerald-50 hover:bg-white/10 transition-colors hover:scale-105"
    >
      {children}
    </a>
  );
};

export default Footer;
