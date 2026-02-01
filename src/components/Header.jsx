import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FaBars, 
  FaTimes, 
  FaSignOutAlt, 
  FaShoppingBasket, 
  FaBoxOpen,
  FaUserCircle,
  FaCaretDown,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaPercent,
  FaLeaf,
  FaFire,
  FaAward
} from "react-icons/fa";
import { 
  IoIosArrowDown,
  IoIosArrowForward
} from "react-icons/io";
import logo2 from "../assets/banana/logo2.jpeg";
import API from "../api/axios";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));

    fetchCartCount();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const { data } = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const totalItems = data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
      setCartCount(totalItems);
    } catch (err) {
      console.error("Cart count error:", err);
      setCartCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCartCount(0);
    navigate("/auth");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "All Product", path: "/ProductDetail" },
    { label: "Contac Us", path: "/contactus" },
    { label: "Wholesale/B2B", path: "/b2b" },
    { label: "About Us", path: "/about" },
  ];

  const promoBanners = [
    { text: "FREE SHIPPING ON ₹500+", icon: <FaTruck className="text-green-500" /> },
    { text: "AUTHENTIC KERALA TASTE", icon: <FaLeaf className="text-yellow-500" /> },
    { text: "NO PRESERVATIVES ADDED", icon: <FaShieldAlt className="text-blue-500" /> },
    { text: "FLASH SALE LIVE!", icon: <FaFire className="text-red-500" /> },
    { text: "24H DISPATCH", icon: <FaAward className="text-orange-500" /> },
  ];

  return (
    <>
      {/* Top Promo Bar */}
      <div className="w-full bg-gradient-to-r from-green-900 via-emerald-900 to-green-800 py-3 overflow-hidden relative border-b border-green-800">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer"></div>
        
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap gap-20">
            {promoBanners.map((banner, index) => (
              <div key={index} className="flex items-center gap-3 text-white/95 group">
                <div className="flex items-center justify-center w-5 h-5 transform group-hover:scale-110 transition-transform">
                  {banner.icon}
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase">{banner.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/98 backdrop-blur-xl shadow-xl shadow-black/5 border-b border-gray-100" 
          : "bg-white border-b border-gray-100"
      }`}>
        
        {/* Main Header Row */}
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col">
            {/* Top Row: Logo + User Actions */}
            <div className="flex items-center justify-between px-6 lg:px-8 py-4">
              
              {/* Logo Section */}
              <Link to="/" className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-yellow-400 rounded-2xl blur-md opacity-70 group-hover:opacity-90 transition-opacity"></div>
                  <img 
                    src={logo2} 
                    alt="MKL Logo" 
                    className="relative h-16 w-16 object-cover rounded-2xl shadow-xl border-4 border-white transform group-hover:rotate-3 group-hover:scale-105 transition-all duration-500" 
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-600 to-emerald-700 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                    <FaStar className="text-white w-2.5 h-2.5" />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-gray-900 tracking-tight leading-none">
                    Maa Kavita
                    <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent"> Lakxmi</span>
                  </span>
                  <span className="text-xs font-bold text-gray-600 tracking-[0.3em] uppercase mt-1">
                    PURELY AUTHENTIC · SINCE 1995
                  </span>
                </div>
              </Link>

              {/* Right Actions */}
              <div className="flex items-center gap-4 lg:gap-6">
                
                {/* User Account */}
                {user ? (
                  <div className="hidden lg:block relative">
                    <button
                      onMouseEnter={() => setShowUserMenu(true)}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-gray-50 transition-all group border border-gray-200"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900">Hi, {user.name.split(' ')[0]}</p>
                        <p className="text-xs text-gray-500 font-medium">My Account</p>
                      </div>
                      <FaCaretDown className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Menu Dropdown */}
                    {showUserMenu && (
                      <div 
                        className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn"
                        onMouseLeave={() => setShowUserMenu(false)}
                      >
                        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-2">
                          {[
                            { icon: <FaUserCircle className="text-gray-600" />, label: "My Profile", path: "/profile" },
                            { icon: <FaBoxOpen className="text-blue-600" />, label: "My Orders", path: "/orders" },
                            { icon: <FaStar className="text-yellow-600" />, label: "Wishlist", path: "/wishlist" },
                            { icon: <FaTruck className="text-purple-600" />, label: "Track Order", path: "/track" },
                          ].map((item, index) => (
                            <Link
                              key={index}
                              to={item.path}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                {item.icon}
                              </div>
                              <span className="font-medium text-gray-900">{item.label}</span>
                            </Link>
                          ))}
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors w-full mt-2 border-t border-gray-100 pt-3"
                          >
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                              <FaSignOutAlt className="text-red-600" />
                            </div>
                            <span className="font-medium text-red-600">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center gap-3">
                    <Link 
                      to="/auth" 
                      className="px-6 py-3.5 bg-gradient-to-r from-green-700 to-emerald-800 text-white rounded-2xl font-bold text-sm hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 shadow-lg"
                    >
                      <FaUserCircle className="text-white/90" />
                      Join Now
                    </Link>
                  </div>
                )}

                {/* Cart */}
                <Link 
                  to="/cart" 
                  className="relative p-3.5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all group shadow-lg shadow-green-100/50 border border-green-100"
                >
                  <FaShoppingBasket className="text-green-700 group-hover:text-green-800 transition-colors" size={24} />
                  
                  {cartCount > 0 && (
                    <>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-600 to-pink-700 text-white text-xs font-black flex items-center justify-center rounded-full border-2 border-white shadow-xl shadow-red-200 animate-pulse-slow">
                        {cartCount > 99 ? "99+" : cartCount}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-600 to-pink-700 text-white text-xs font-black flex items-center justify-center rounded-full border-2 border-white shadow-xl shadow-red-200 animate-ping opacity-30"></div>
                    </>
                  )}
                </Link>

                {/* Mobile Menu Toggle */}
                <button 
                  className="lg:hidden p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all border border-gray-200"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <FaTimes className="text-gray-700" size={24} />
                  ) : (
                    <FaBars className="text-gray-700" size={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Bar (Separate Row) */}
            <div className="hidden lg:block border-t border-gray-100">
              <div className="flex items-center justify-center px-8 py-4">
                <nav className="flex items-center gap-12">
                  {navLinks.map((link, index) => (
                    <div key={link.path} className="relative group">
                      <Link 
                        to={link.path} 
                        className={`font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                          location.pathname === link.path 
                            ? "text-green-700" 
                            : "text-gray-700 hover:text-green-600"
                        }`}
                      >
                        {link.label}
                      </Link>
                      
                      {/* Animated underline */}
                      <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 ${
                        location.pathname === link.path 
                          ? 'w-full' 
                          : 'group-hover:w-full'
                      }`}></div>
                      
                      {/* Decorative dot */}
                      <div className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                        location.pathname === link.path 
                          ? 'bg-green-500' 
                          : 'bg-transparent group-hover:bg-green-400'
                      }`}></div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 top-0 bg-white z-50 lg:hidden animate-slideIn">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <div className="flex items-center gap-3">
                  <img src={logo2} alt="Logo" className="w-12 h-12 rounded-xl" />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Maa Kavita Lakxmi</p>
                    <p className="text-xs text-gray-500">PURELY AUTHENTIC</p>
                  </div>
                </div>
              </Link>
              <button 
                onClick={() => setMenuOpen(false)}
                className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <FaTimes className="text-gray-700" size={20} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="p-6">
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                      location.pathname === link.path
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <span className="font-bold text-gray-900 text-lg tracking-wide">{link.label}</span>
                    <IoIosArrowForward className={`text-gray-300 ${location.pathname === link.path ? 'text-green-500' : ''}`} />
                  </Link>
                ))}

                {user && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">MY ACCOUNT</h3>
                    {[
                      { icon: <FaUserCircle />, label: "Profile", path: "/profile" },
                      { icon: <FaBoxOpen />, label: "Orders", path: "/orders" },
                      { icon: <FaStar />, label: "Wishlist", path: "/wishlist" },
                    ].map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all mb-2"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="font-medium text-gray-900 text-base">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-12 space-y-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 text-center font-bold text-red-600 border-2 border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
                    >
                      LOGOUT
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center py-4 font-bold bg-gradient-to-r from-green-700 to-emerald-800 text-white rounded-2xl hover:shadow-lg transition-all tracking-wide"
                  >
                    JOIN NOW / LOGIN
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default Header;