import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaShoppingBasket, FaUserCircle, FaSearch, FaLock, FaPhone, FaEnvelope } from "react-icons/fa";
import API from "../../config/api/apiconfig";
import logo from "../../assets/banana/logo2.png";
import { submitQuote } from "../../utils/orderApi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPartnerPanel, setShowPartnerPanel] = useState(false);
  const [submittingPartner, setSubmittingPartner] = useState(false);
  const [partnerStatus, setPartnerStatus] = useState({ type: "", message: "" });
  const [partnerForm, setPartnerForm] = useState({
    companyName: "",
    gstNumber: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    quantity: "",
    message: "",
  });

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
    navigate("/auth/sign-in");
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

  const handlePartnerFormChange = (event) => {
    const { name, value } = event.target;
    setPartnerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartnerSubmit = async (event) => {
    event.preventDefault();
    setSubmittingPartner(true);
    setPartnerStatus({ type: "", message: "" });

    try {
      await submitQuote({
        source: "b2b",
        sourceLabel: "Header Partner Form",
        customer: {
          name: partnerForm.contactName,
          phone: partnerForm.phoneNumber,
          email: partnerForm.email,
        },
        company: {
          name: partnerForm.companyName,
          gstNumber: partnerForm.gstNumber,
        },
        quantity: partnerForm.quantity,
        message: partnerForm.message,
        page: "header",
        section: "partner-form",
      });

      setPartnerStatus({
        type: "success",
        message: "Request submitted successfully. Our team will contact you shortly.",
      });
      setPartnerForm({
        companyName: "",
        gstNumber: "",
        contactName: "",
        phoneNumber: "",
        email: "",
        quantity: "",
        message: "",
      });
    } catch (error) {
      setPartnerStatus({
        type: "error",
        message: error?.message || "Could not submit request. Please try again.",
      });
    } finally {
      setSubmittingPartner(false);
    }
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
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-lg md:text-l font-bold text-gray-900 tracking-tight">Maa Kavita Laxmi Pvt. Ltd.</p>
              <div className="flex flex-wrap gap-1 text-[12px] text-gray-600">
                <span className="md:text-2px">Malsalami, Shahadra, Patna</span>
                <span className="flex items-center gap-1 md:">
                  <span className=" md:text-2px inline-block w-2 h-2 rounded-full bg-green-600" />
                  GST No.: 10AAOCM9571F1ZB
                </span>
              </div>
            </div>
          </Link>
          <div className="flex h items-center gap-3">
            {/* Cart Icon Desktop */}
            <button
              type="button"
              className="hidden md:inline-flex items-center justify-center relative w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:bg-green-50 transition"
              onClick={() => navigate('/cart')}
              aria-label="Cart"
            >
              <FaShoppingBasket size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="tel:+918252753985"
              className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 hover:border-green-300 transition"
            >
              <FaPhone className="text-green-700 mr-2" />
              <div className="text-[11px]">
                <p className="font-bold text-gray-900">Call 8492995999</p>
                <p className="text-[7px] text-gray-500">100% Response rate</p>
              </div>
            </a>
            <button
              type="button"
              onClick={() => setShowPartnerPanel(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-800"
            >
              <FaEnvelope />
              Send Email
            </button>

            {/* Cart Icon Mobile */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:bg-green-50 transition relative"
              onClick={() => navigate('/cart')}
              aria-label="Cart"
            >
              <FaShoppingBasket size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Hamburger Menu */}
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
            {/* <button className="inline-flex items-center gap-2 font-semibold">
              <FaBars />
            </button> */}
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
                  to="/auth/sign-in"
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

      {/* Partner Form Side Panel */}
      {showPartnerPanel && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/35"
            onClick={() => setShowPartnerPanel(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col">
            <div className="px-4 sm:px-5 py-4 border-b border-slate-200 flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-black text-slate-900 leading-tight">Become a Wholesale Partner</p>
                <p className="text-xs text-slate-500 mt-1">Share details and our team will connect quickly.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPartnerPanel(false)}
                className="h-9 w-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <FaTimes className="mx-auto" />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto">
              {partnerStatus.message && (
                <div
                  className={`mb-3 rounded-lg border px-3 py-2 text-xs font-semibold ${
                    partnerStatus.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {partnerStatus.message}
                </div>
              )}

              <form onSubmit={handlePartnerSubmit} className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={partnerForm.companyName}
                    onChange={handlePartnerFormChange}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-green-600"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={partnerForm.gstNumber}
                    onChange={handlePartnerFormChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-green-600"
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Person</label>
                  <input
                    type="text"
                    name="contactName"
                    value={partnerForm.contactName}
                    onChange={handlePartnerFormChange}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-green-600"
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={partnerForm.phoneNumber}
                    onChange={handlePartnerFormChange}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-green-600"
                    placeholder="WhatsApp / mobile"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={partnerForm.email}
                    onChange={handlePartnerFormChange}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-green-600"
                    placeholder="Business email"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Required Quantity (Monthly)</label>
                  <input
                    type="text"
                    name="quantity"
                    value={partnerForm.quantity}
                    onChange={handlePartnerFormChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-green-600"
                    placeholder="e.g. 200 Kg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                  <textarea
                    rows={3}
                    name="message"
                    value={partnerForm.message}
                    onChange={handlePartnerFormChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-green-600 resize-none"
                    placeholder="Share product/category requirements"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingPartner}
                  className="mt-1 h-10 rounded-lg bg-green-700 text-white text-sm font-bold hover:bg-green-800 disabled:opacity-60"
                >
                  {submittingPartner ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
