import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaCheckCircle } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-yellow text-gray-900 mt-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 py-8 border-b border-yellow-500/20 text-center">
        <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-full shadow-sm"><FaCheckCircle className="text-brand-green" /></div>
            <span className="font-semibold text-sm">From our advanced oil extracting facility to your snack bowl,</span>
        </div>
        <div className="flex items-center gap-2">
             <div className="bg-white p-2 rounded-full shadow-sm"><FaCheckCircle className="text-brand-green" /></div>
            <span className="font-semibold text-sm">every chip and bhujiya meets 100% standardized quality</span>
        </div>
        <div className="flex items-center gap-2">
             <div className="bg-white p-2 rounded-full shadow-sm"><FaCheckCircle className="text-brand-green" /></div>
            <span className="font-semibold text-sm">HYGIENIC PROCESSING</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
                {/* Logo placeholder */}
                <div className="bg-white p-2 rounded shadow-sm inline-block">
                    <div className="text-xl font-bold text-red-600 tracking-tighter">
                        Maa<span className="text-green-700"> Kavita Lakxmi</span>
                    </div>
                </div>
            </div>
            
            <p className="mt-3 text-sm text-gray-800 font-medium leading-relaxed">
              Authentic taste. Pure ingredients. Crunch you can trust — since 2024.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a href="#" className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white hover:bg-white/80 text-brand-green transition shadow-sm"><FaFacebookF /></a>
              <a href="#" className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white hover:bg-white/80 text-red-600 transition shadow-sm"><FaYoutube /></a>
              <a href="#" className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white hover:bg-white/80 text-pink-600 transition shadow-sm"><FaInstagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">Quick Links</h6>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/contactus" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/locate" className="hover:text-white transition">Store Locator</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h6 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">Policies</h6>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link to="/refund" className="hover:text-white transition">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">Customer Support</h6>
            <div className="space-y-3 text-sm font-medium">
              <p className="text-xl font-bold text-brand-green mb-2">+91 8252753985</p>
              <p className="text-xl font-bold text-brand-green mb-2">+91 7366981951</p>
              <div className="flex items-start gap-3">
                <MdLocationOn className="text-gray-800 text-lg mt-0.5" />
                <p>
                  Malsalami, Shahadra, Patna City-800008<br />
                  Bihar,India
                </p>
              </div>
              <div className="flex items-center gap-3">
                 <MdEmail className="text-gray-800 text-lg" />
                 <p>maakavitalaxmi@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-yellow-600 text-white text-center py-4 text-xs md:text-sm">
        <p>&copy; {new Date().getFullYear()} Maa Kavita Lakxmi. All rights reserved. Designed for Taste.</p>
      </div>
    </footer>
  );
};

export default Footer;
