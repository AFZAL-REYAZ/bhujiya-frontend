import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaShoppingBasket, FaUserCircle, FaSearch, FaLock } from "react-icons/fa";
import API from "../api/axios";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [cartCount, setCartCount] = useState(0);

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

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "All Products", path: "/ProductDetail" },
    { label: "Wholesale / B2B", path: "/b2b" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contactus" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-40 bg-white border-b border-gray-200 transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold text-green-900 tracking-tight">
            Maa Kavita
          </span>
          <span className="hidden lg:inline text-lg sm:text-xl font-light text-green-700">
            Laxmi Pvt. Ltd.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === link.path
                  ? "text-green-800"
                  : "text-gray-600 hover:text-green-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* 🔥 Admin Dashboard Button (Desktop) */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="hidden lg:flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-all mr-2"
            >
              <FaLock size={10} />
              Admin
            </Link>
          )}

          <button
            type="button"
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-green-900 hover:bg-gray-100"
          >
            <FaSearch size={15} />
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="hidden md:block text-xs font-bold text-gray-500 hover:text-green-800">
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-700"
              >
                <FaSignOutAlt size={13} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-green-900"
            >
              <FaUserCircle size={16} />
              Login
            </Link>
          )}

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

            {navLinks.map((link) => (
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