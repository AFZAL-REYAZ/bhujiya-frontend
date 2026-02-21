import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaShoppingBasket, FaUserCircle, FaSearch } from "react-icons/fa";
import API from "../api/axios";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

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
          <span className="text-lg sm:text-xl font-semibold text-green-900">
            Maa Kavita
          </span>
          <span className="hidden sm:inline text-lg sm:text-xl font-semibold text-green-900">
            Laxmi Pvt. Ltd.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-green-800"
                  : "text-gray-700 hover:text-[#0b3b2a]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-[#0b3b2a] hover:bg-gray-100"
          >
            <FaSearch size={16} />
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-red-600"
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#0b3b2a]"
            >
              <FaUserCircle size={16} />
              Login
            </Link>
          )}

          <Link
            to="/cart"
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors"
          >
            <FaShoppingBasket size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] px-1 h-[18px] rounded-full bg-red-600 text-[10px] font-semibold text-white flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2 rounded text-sm font-medium ${
                  location.pathname === link.path
                  ? "text-green-800 bg-green-50"
                  : "text-gray-700 hover:text-[#0b3b2a] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-gray-100 pt-2">
              {user ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-2 py-2 rounded text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="block px-2 py-2 rounded text-sm font-medium text-gray-700 hover:text-[#0b3b2a] hover:bg-gray-50"
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
