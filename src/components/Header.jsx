// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingBag, FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    "Banana Chips | Potato Chips | Tapioca Chips | Murukku | Mixture | Puffed Snacks | Cakes",
    "Banana Chips | Potato Chips | Tapioca Chips | Murukku | Mixture | Puffed Snacks | Cakes",
  ];

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Combos", path: "/combos" }, // Assuming routes exist or just placeholders
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Recipes", path: "/recipes" },
    { label: "Locate", path: "/locate" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-white shadow-sm`}
    >
      {/* Top announcement bar */}
      <div className="bg-brand-green py-2 overflow-hidden text-white">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex gap-4 w-max animate-marquee text-xs md:text-sm font-medium whitespace-nowrap">
            {items.map((item, i) => (
              <span key={i} className="mx-4">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
            {/* Logo placeholder - replacing text with a visually distinct header */}
            <div className="text-2xl font-bold text-red-600 tracking-tighter">
                Maa<span className="text-green-700"> Kavita Lakxmi</span>
            </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.path} to={l.path} className="text-sm font-medium text-gray-700 hover:text-brand-green uppercase tracking-wide transition">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2 cursor-pointer hover:text-brand-green">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png" className="h-4 w-6 object-cover border" alt="IN" />
                 <span className="text-xs font-bold">INR ₹</span>
            </div>
            <FaSearch className="cursor-pointer hover:text-brand-green" />
            <FaUser className="cursor-pointer hover:text-brand-green" />
            <div className="relative cursor-pointer hover:text-brand-green">
                <FaShoppingCart />
                <span className="absolute -top-2 -right-2 bg-brand-green text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full left-0 top-full shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link key={l.path} to={l.path} className="text-gray-800 font-medium hover:text-brand-green" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
             <div className="flex gap-4 mt-2 border-t pt-4">
                <FaSearch className="text-gray-600" />
                <FaUser className="text-gray-600" />
                <FaShoppingCart className="text-gray-600" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
