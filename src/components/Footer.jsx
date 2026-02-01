import React from "react";
import { 
  FaFacebookF, FaYoutube, FaInstagram, FaCheckCircle, 
  FaTwitter, FaWhatsapp, FaArrowUp 
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhoneInTalk } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#FFF6D6] text-gray-900 mt-20">
      
      {/* ================= WAVE DIVIDER ================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[-99%]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20 fill-[#FFF6D6]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* ================= TRUST BAR ================= */}
      <div className="bg-white/50 backdrop-blur-md border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Direct from Facility", sub: "Seed to snack bowl purity", icon: <FaCheckCircle /> },
              { text: "Strict Quality Control", sub: "Global safety standards", icon: <FaCheckCircle /> },
              { text: "Hygienic Processing", sub: "Untouched by hand packing", icon: <FaCheckCircle /> },
            ].map((item, i) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={i} 
                className="flex items-center gap-4 justify-center md:justify-start group"
              >
                <div className="text-green-600 text-xl group-hover:rotate-[360deg] transition-transform duration-500">
                  {item.icon}
                </div>
                <div>
                  <p className="font-black text-xs uppercase tracking-widest">{item.text}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">

          {/* BRAND COLUMN */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <h3 className="text-2xl font-black text-red-700 leading-none tracking-tighter">
                MAA KAVITA <br/> LAKXMI <span className="text-xs font-bold text-gray-400 block mt-1">PVT. LTD.</span>
              </h3>
              <p className="mt-6 text-sm text-gray-600 font-medium leading-relaxed">
                Authentic taste, pure ingredients, and trusted crunch — proudly serving quality snacks crafted with tradition and modern safety.
              </p>
            </motion.div>

            <div className="flex items-center gap-3">
              <SocialIcon icon={<FaFacebookF />} color="hover:bg-blue-600" />
              <SocialIcon icon={<FaInstagram />} color="hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500" />
              <SocialIcon icon={<FaYoutube />} color="hover:bg-red-600" />
              <SocialIcon icon={<FaWhatsapp />} color="hover:bg-green-500" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <FooterColumn title="Company">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">Our Legacy</FooterLink>
            <FooterLink to="/ProductDetail">Product Range</FooterLink>
            <FooterLink to="/b2b">Wholesale Portal</FooterLink>
            <FooterLink to="/contactus">Get in Touch</FooterLink>
          </FooterColumn>

          {/* POLICIES */}
          <FooterColumn title="Legal">
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/b2b">Shipping Info</FooterLink>
            <FooterLink to="/#">Returns & Refund</FooterLink>
          </FooterColumn>

          {/* CONTACT */}
          <FooterColumn title="Help Desk">
            <div className="space-y-4">
              <ContactRow 
                icon={<MdPhoneInTalk className="text-red-600" />} 
                title="Customer Care"
                text="+91 82527 53985"
                link="tel:+918252753985"
              />
              <ContactRow 
                icon={<MdEmail className="text-red-600" />} 
                title="Email Support"
                text="maakavitalaxmi@gmail.com"
                link="mailto:maakavitalaxmi@gmail.com"
              />
              <ContactRow 
                icon={<MdLocationOn className="text-red-600" />} 
                title="Head Office"
                text="Malsalami, Patna City, Bihar - 800008"
                link="https://google.com/maps"
              />
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* ================= FOOTER BOTTOM ================= */}
      <div className="bg-[#111] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
            © {new Date().getFullYear()} Maa Kavita Lakxmi Pvt Ltd • Crafted with Love in India
          </p>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
                <img src="https://img.icons8.com/color/48/visa.png" className="h-6 grayscale hover:grayscale-0 transition opacity-50 hover:opacity-100" alt="visa"/>
                <img src="https://img.icons8.com/color/48/mastercard.png" className="h-6 grayscale hover:grayscale-0 transition opacity-50 hover:opacity-100" alt="mc"/>
                <img src="https://img.icons8.com/color/48/upi.png" className="h-6 grayscale hover:grayscale-0 transition opacity-50 hover:opacity-100" alt="upi"/>
            </div>
            <button 
                onClick={scrollToTop}
                className="bg-yellow-500 hover:bg-white hover:text-black transition-all p-3 rounded-full text-black shadow-lg shadow-yellow-500/20"
            >
                <FaArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================= HELPER COMPONENTS ================= */

function FooterColumn({ title, children }) {
  return (
    <div className="flex flex-col space-y-4">
      <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-700 flex items-center gap-2">
        <span className="w-6 h-[2px] bg-red-700" /> {title}
      </h6>
      <div className="flex flex-col space-y-3">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-xs font-bold text-gray-500 hover:text-red-600 transition-all hover:translate-x-2 flex items-center gap-1"
    >
      {children}
    </Link>
  );
}

function ContactRow({ icon, title, text, link }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase text-gray-400 leading-none mb-1">{title}</p>
        <p className="text-xs font-bold text-gray-800 group-hover:text-red-600 transition-colors">{text}</p>
      </div>
    </a>
  );
}

function SocialIcon({ icon, color }) {
  return (
    <motion.a
      whileHover={{ y: -5 }}
      href="#"
      className={`h-10 w-10 flex items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm border border-yellow-200 transition-all hover:text-white hover:shadow-xl ${color}`}
    >
      {icon}
    </motion.a>
  );
}

export default Footer;