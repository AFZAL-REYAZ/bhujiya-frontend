import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaSignOutAlt, FaShoppingBasket, FaBoxOpen } from "react-icons/fa";
import logo2 from "../assets/banana/logo2.jpeg";
import API from "../api/axios";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

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
    }
  };

  // Search Logic (Simulating filtering from API or Global State)
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      try {
        // Replace with your actual products endpoint
        const { data } = await API.get(`/products?search=${query}`); 
        setSearchResults(data.slice(0, 5)); // Limit to 5 results
        setShowSearch(true);
      } catch (err) {
        // Fallback or handle error
        setSearchResults([]);
      }
    } else {
      setShowSearch(false);
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
    { label: "Shop", path: "/ProductDetail" },
    { label: "Wholesale/B2B", path: "/b2b" },
    { label: "Our Story", path: "/about" },
  ];

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg py-2" : "bg-white py-4"
    }`}>
      
      <div className="bg-neutral-900 py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-white text-[10px] font-black uppercase tracking-[0.2em]">
           <span>Free delivery on orders above ₹500</span>
           <span>Authentic Kerala Taste</span>
           <span>No Preservatives Added</span>
           <span>Ships within 24 Hours</span>
           <span>Free delivery on orders above ₹500</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between mt-2">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
             <img src={logo2} alt="MKL Logo" className="h-12 w-12 object-contain rounded-2xl shadow-md group-hover:rotate-6 transition-transform duration-300" />
             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col hidden md:flex">
            <span className="text-xl font-black text-gray-900 tracking-tighter leading-none">Maa Kavita Lakxmi</span>
            <span className="text-[9px] font-bold text-green-700 tracking-[0.2em] uppercase opacity-80">Purely Authentic</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all hover:text-green-600 ${
                location.pathname === link.path ? "text-green-600 underline underline-offset-8" : "text-gray-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {/* Search Engine */}
          <div className="relative hidden sm:block">
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100 group focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
              <FaSearch className="text-gray-400 group-focus-within:text-green-600" size={12} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Snacks..." 
                className="bg-transparent border-none text-[11px] font-bold px-3 focus:outline-none w-32 lg:w-48" 
              />
            </div>
            
            {/* Search Dropdown (Amazon Style) */}
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white mt-2 shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
                {searchResults.map((item) => (
                  <Link 
                    key={item._id} 
                    to={`/product/${item._id}`} 
                    onClick={() => setShowSearch(false)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img src={item.image} className="w-8 h-8 object-contain" alt="" />
                    <span className="text-xs font-bold text-gray-700">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 border-l pl-4 border-gray-100">
                {/* Orders Icon */}
                <Link to="/orders" title="My Orders" className="p-2.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
                   <FaBoxOpen size={20} />
                </Link>

                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-gray-400 uppercase leading-none">Account</p>
                  <p className="text-xs font-black text-gray-800 uppercase">{user.name.split(' ')[0]}</p>
                </div>

                <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-all">
                  <FaSignOutAlt size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/auth" className="text-[11px] font-black uppercase bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-gray-200">
                  Join Now
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative p-2.5 bg-green-50 text-green-700 rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300">
              <FaShoppingBasket size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="lg:hidden p-2 text-gray-900" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-[90px] bg-white z-40 lg:hidden p-8 flex flex-col animate-fadeIn">
          <nav className="flex flex-col gap-6">
            {navLinks.map((l) => (
              <Link 
                key={l.path} 
                to={l.path} 
                className="text-4xl font-black text-gray-900 uppercase tracking-tighter" 
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <Link 
                to="/orders" 
                className="text-4xl font-black text-green-600 uppercase tracking-tighter"
                onClick={() => setMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
          </nav>
          
          <div className="mt-auto space-y-4">
            {!user ? (
              <Link to="/auth" className="block w-full text-center py-4 font-black bg-gray-900 text-white rounded-2xl uppercase tracking-widest text-sm" onClick={() => setMenuOpen(false)}>Login / Register</Link>
            ) : (
              <button onClick={handleLogout} className="w-full text-center py-4 font-black text-red-600 border-2 border-red-100 rounded-2xl uppercase tracking-widest text-sm">Logout Session</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;