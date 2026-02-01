import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FaBars, FaTimes, FaSearch, FaSignOutAlt, 
  FaShoppingBasket, FaBoxOpen, FaUserCircle 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo2 from "../assets/banana/logo2.jpeg";
import API from "../api/axios";

// --- INJECTED ANIMATIONS ---
const styleTag = `
  @keyframes marquee-infinite {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes gradient-bg {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-marquee-infinite {
    display: flex;
    width: max-content;
    animation: marquee-infinite 30s linear infinite;
  }
  .animate-gradient-flow {
    background-size: 200% 200%;
    animation: gradient-bg 8s ease infinite;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));

    fetchCartCount();
    setMenuOpen(false); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setCartCount(0);
    try {
      const { data } = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0);
    } catch (err) { console.error(err); }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      try {
        const { data } = await API.get(`/products?search=${query}`); 
        setSearchResults(data.slice(0, 5));
        setShowSearch(true);
      } catch (err) { setSearchResults([]); }
    } else { setShowSearch(false); }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCartCount(0);
    navigate("/auth");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/ProductDetail" },
    { label: "Wholesale", path: "/b2b" },
    { label: "Our Story", path: "/about" },
  ];

  return (
    <>
      <style>{styleTag}</style>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-2" : "py-0"
      }`}>
        
        {/* --- 🌈 UPGRADED MULTI-COLOR MARQUEE --- */}
        <div className={`relative transition-all duration-700 overflow-hidden shadow-inner ${
          scrolled ? "h-0 opacity-0" : "h-10 md:h-12 opacity-100"
        }`}>
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d90429] via-[#f77f00] via-[#06d6a0] via-[#118ab2] to-[#d90429] animate-gradient-flow" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

          <div className="relative flex items-center h-full">
            <div className="animate-marquee-infinite flex items-center gap-12 text-white">
              {[...Array(2)].map((_, index) => (
                <React.Fragment key={index}>
                  <MarqueeItem text="Free delivery above ₹500" icon="🚚" color="text-yellow-300" />
                  <MarqueeItem text="Authentic Kerala Banana Chips" icon="🍌" />
                  <MarqueeItem text="No Artificial Preservatives" icon="🛡️" color="text-green-300" />
                  <MarqueeItem text="Flash Sale: Use Code 'SNACK20'" icon="✨" color="text-orange-200" />
                  <MarqueeItem text="Directly From Factory" icon="🏭" />
                  <MarqueeItem text="FSSAI & MSME Certified" icon="✅" color="text-emerald-300" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* --- 💎 FLOATING GLASS NAVIGATION --- */}
        <div className={`mx-4 md:mx-8 mt-2 rounded-[2.5rem] transition-all duration-500 border ${
          scrolled 
          ? "bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-white/40 px-6 py-3" 
          : "bg-white px-6 py-6 border-transparent"
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* LOGO AREA */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="relative">
                <img src={logo2} alt="MKL" className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-2xl shadow-lg border-2 border-gray-50" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-black text-gray-900 tracking-tighter leading-none">Maa Kavita Lakxmi SNACKS</span>
                <span className="text-[9px] font-bold text-green-700 tracking-[0.3em] uppercase opacity-70">Authentic Taste</span>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`relative text-[11px] font-black uppercase tracking-widest transition-all duration-300 group ${
                    location.pathname === link.path ? "text-green-600" : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 h-[3px] bg-green-600 rounded-full transition-all duration-300 ${
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </nav>

            {/* INTERACTION HUB */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* SEARCH ENGINE */}
              <div className="relative hidden xl:block">
                <div className="flex items-center bg-gray-100/80 px-4 py-2.5 rounded-2xl border border-transparent focus-within:border-green-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100 transition-all w-48 focus-within:w-72">
                  <FaSearch className="text-gray-400" size={13} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search favorites..." 
                    className="bg-transparent border-none text-[12px] font-bold px-3 focus:outline-none w-full placeholder:text-gray-400" 
                  />
                </div>
                <AnimatePresence>
                  {showSearch && searchResults.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute top-full right-0 w-[320px] bg-white mt-4 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[2rem] border border-gray-100 overflow-hidden z-[110]"
                    >
                      <p className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50">Top Results</p>
                      {searchResults.map((item) => (
                        <Link key={item._id} to={`/product/${item._id}`} className="flex items-center gap-4 p-4 hover:bg-green-50 transition-colors border-b last:border-0 border-gray-50 group">
                          <img src={item.image} className="w-12 h-12 object-contain bg-white rounded-lg p-1 shadow-sm" alt="" />
                          <div className="flex flex-col">
                            <span className="text-[12px] font-black text-gray-800 uppercase group-hover:text-green-700">{item.name}</span>
                            <span className="text-[10px] font-bold text-gray-400">View Product →</span>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* USER PANEL */}
              <div className="flex items-center gap-1 md:gap-3 bg-gray-50/50 p-1.5 rounded-3xl border border-gray-100">
                {user ? (
                  <div className="flex items-center gap-1">
                    <Link to="/orders" className="p-2.5 text-gray-500 hover:text-green-600 hover:bg-white rounded-2xl transition-all shadow-sm">
                      <FaBoxOpen size={18} />
                    </Link>
                    <button onClick={handleLogout} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-2xl transition-all shadow-sm">
                      <FaSignOutAlt size={18} />
                    </button>
                  </div>
                ) : (
                  <Link to="/auth" className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase bg-gray-900 text-white px-6 py-2.5 rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-gray-200">
                    Join
                  </Link>
                )}

                {/* CART */}
                <Link to="/cart" className="relative p-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-200">
                  <FaShoppingBasket size={18} />
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-black w-6 h-6 flex items-center justify-center rounded-full border-[3px] border-white shadow-md"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </div>

              {/* MOBILE TRIGGER */}
              <button 
                className="lg:hidden p-3 text-gray-900 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all" 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- 📱 FULLSCREEN MOBILE MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[90] lg:hidden flex flex-col pt-32 px-10 pb-12"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mb-4">Navigation</span>
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link 
                    to={l.path} 
                    className="text-6xl font-black text-gray-900 uppercase tracking-tighter hover:text-green-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5 }} className="h-1 bg-gray-100 rounded-full my-4" />
              
              {user && (
                <Link to="/orders" className="text-3xl font-black text-green-600 uppercase" onClick={() => setMenuOpen(false)}>
                  Order History
                </Link>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-4">
               <div className="p-6 bg-gray-50 rounded-[2.5rem] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <FaUserCircle size={30} className="text-gray-200" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Status</p>
                      <p className="text-lg font-black text-gray-900">{user ? user.name.split(' ')[0] : "Welcome Guest"}</p>
                    </div>
                  </div>
                  {user && <button onClick={handleLogout} className="text-red-500 font-black uppercase text-[10px]">Logout</button>}
               </div>
               {!user && (
                 <Link to="/auth" className="block w-full text-center py-6 font-black bg-gray-900 text-white rounded-[2rem] uppercase text-xs tracking-[0.2em] shadow-2xl shadow-gray-300" onClick={() => setMenuOpen(false)}>
                    Create Account
                 </Link>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* --- MINI SUB-COMPONENT --- */
function MarqueeItem({ text, icon, color = "text-white" }) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <span className="text-base">{icon}</span>
      <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] ${color}`}>
        {text}
      </span>
      <span className="mx-4 text-white/20 font-light text-xl">/</span>
    </div>
  );
}

export default Header;