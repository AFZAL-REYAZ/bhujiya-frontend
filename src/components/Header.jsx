import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaShoppingBasket, FaUserCircle, FaSearch, FaLock, FaPhone, FaEnvelope } from "react-icons/fa";
import API from "../api/axios";
import logo from "../assets/banana/logo2.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const loggedInUser = localStorage.getItem("user");
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
    setIsAdmin(adminStatus);

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
      const { data } = await API.get("/cart");
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
    setIsAdmin(false);
    setCartCount(0);
    navigate("/auth");
  };

  const primaryNav = [
    { label: "", path: "/" },
    { label: "Home", path: "/" },
    { label: "B2B", path: "/b2b" },
    { label: "Profile", path: "/about" },
    { label: "Contact Us", path: "/contactus" },
  ];
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/ProductDetail?q=${encodeURIComponent(searchTerm.trim())}`);
  };
  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length === 0) return;
    const id = setTimeout(() => {
      navigate(`/ProductDetail?q=${encodeURIComponent(searchTerm.trim())}`);
    }, 1000);
    return () => clearTimeout(id);
  }, [searchTerm, navigate]);

  return (
    <header className={`w-full fixed top-0 left-0 z-40 transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Maa Kavita Laxmi Pvt. Ltd.</p>
              <div className="flex flex-wrap gap-3 text-[12px] text-gray-600">
                <span>Malsalami, Shahadra, Patna</span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-600" />
                  GST No.: 10AAOCM9571F1ZB
                </span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2">
              <FaPhone className="text-green-700 mr-2" />
              <div className="text-sm">
                <p className="font-bold text-gray-900">Call 82527 53985</p>
                <p className="text-[11px] text-gray-500">86% Response rate</p>
              </div>
            </div>
            <a href="mailto:maakavitalaxmi@gmail.com" className="hidden sm:inline-flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-800">
              <FaEnvelope />
              Send Email
            </a>
            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all shadow-sm"
            >
              <FaShoppingBasket size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] px-1 h-[20px] rounded-full bg-red-600 text-[10px] font-black text-white flex items-center justify-center border-2 border-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#1f2937]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-12 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-6 text-white">
            <button className="inline-flex items-center gap-2 font-semibold">
              <FaBars />
            </button>
            {primaryNav.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold ${location.pathname === link.path ? "text-lime-300" : "text-gray-200 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Products/Services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 md:w-80 h-9 rounded-l-xl px-3 text-sm bg-white border border-gray-300 focus:outline-none"
            />
            <button onClick={handleSearch} className="h-9 px-3 rounded-r-xl bg-green-700 text-white text-sm font-bold flex items-center gap-2">
              <FaSearch />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top duration-300">
          <nav className="px-4 py-4 space-y-2">
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-black bg-black text-white mb-4"
              >
                <FaLock size={14} />
                ADMIN DASHBOARD
              </Link>
            )}

            {primaryNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-3 rounded-xl text-sm font-bold ${
                  location.pathname === link.path
                    ? "text-green-900 bg-green-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-gray-100 pt-4 space-y-2">
              {user && (
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  My Orders
                </Link>
              )}
              {user ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
