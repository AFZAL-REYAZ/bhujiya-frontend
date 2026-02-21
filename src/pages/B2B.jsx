import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart, Zap, Truck, Phone, Mail, 
  CheckCircle2, Info, Package, Store, 
  ArrowRight, ShieldCheck, Globe, Percent,
  MessageCircle, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import API from "../api/axios";

// Assets
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";
import bananach5 from "../assets/banana/bananach5.jpeg";

function B2BPageOld() {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const bulkProducts = [
    { id: "b1", title: "Signature Banana Chips", price: 400, retail: 450, minQty: 10, desc: "Hand-sliced premium Nendran bananas fried in cold-pressed coconut oil.", image: chilliBana, category: "chips" },
    { id: "b2", title: "Natural Banana Powder", price: 400, retail: 480, minQty: 10, desc: "Sun-dried raw banana flour, perfect for health supplements.", image: bananaPowder, category: "powder" },
    { id: "b3", title: "Banana Length Pepper", price: 400, retail: 440, minQty: 10, desc: "Long-cut style infused with black Malabar pepper.", image: bananach5, category: "chips" },
    { id: "b5", title: "Spicy Banana Chips", price: 400, retail: 460, minQty: 10, desc: "Infused with bird's eye chilli for an authentic kick.", image: bananaChilli, category: "chips" },
    { id: "b6", title: "Classic Banana Chips", price: 400, retail: 420, minQty: 10, desc: "Traditional sea-salt variant, the gold standard of snacks.", image: bananaChips, category: "chips" },
    { id: "b7", title: "Banana Salti Chips", price: 400, retail: 430, minQty: 10, desc: "Ultra-thin crisps seasoned with Himalayan pink salt.", image: bananaSalti, category: "chips" },
  ];

  const handleBulkAction = async (product, quantity, redirectToCart = false) => {
    const token = localStorage.getItem("token");
    if (!token) { 
      toast.error("Wholesale access requires an account.");
      navigate("/auth"); 
      return; 
    }

    setLoadingId(product.id);
    try {
      await API.post("/cart/add", {
        productId: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        isBulk: true 
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (redirectToCart) navigate('/cart');
      else toast.success(`Added ${quantity} units to your wholesale cart!`);
    } catch (err) {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] pt-24 pb-20 selection:bg-green-100 overflow-x-hidden">
      <Toaster position="bottom-right" />
      
      {/* --- FLOATING WHATSAPP WIDGET --- */}
      <motion.a 
        href="https://wa.me/919876543210" 
        target="_blank"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm whitespace-nowrap">Chat with Manager</span>
        <MessageCircle size={28} />
      </motion.a>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="relative mb-24 mt-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-[#0b3b2a] text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-green-100">
              <Globe size={12} className="animate-spin-slow" /> Global Supply Chain
            </span>
            <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter leading-[0.85] mb-8">
              DIRECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">SOURCE.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed mb-10">
              Skip the middleman. Secure factory-gate pricing on India's most exported snack range. Built for retailers who demand quality and consistency.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all">
                  Download Catalog <ExternalLink size={18}/>
               </button>
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200" />
                  ))}
                  <div className="pl-6 flex flex-col justify-center">
                    <p className="text-xs font-black text-gray-900 leading-none">500+ PARTNERS</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Trusted Globally</p>
                  </div>
               </div>
            </div>
          </motion.div>
          
          {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
        </section>

        {/* --- STAT TICKER --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: "Daily Output", value: "25 Tons", icon: <Package size={16}/> },
            { label: "Wholesale Disc.", value: "Up to 30%", icon: <Percent size={16}/> },
            { label: "QC Verified", value: "Level 4", icon: <ShieldCheck size={16}/> },
            { label: "Fast Logistics", value: "48H Dispatch", icon: <Truck size={16}/> },
          ].map((stat, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i} className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-green-600">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-lg font-black text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {bulkProducts.map((product) => (
              <BulkProductCard 
                key={product.id} 
                product={product} 
                onAction={handleBulkAction} 
                isLoading={loadingId === product.id}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* --- CONTACT & SUPPORT --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 bg-gray-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none mb-6">NEED A CUSTOM <br/> <span className="text-green-400">QUOTATION?</span></h2>
              <p className="text-gray-400 font-medium text-lg mb-8 max-w-md">For containers or customized white-labeling, our specialized account managers are ready to assist.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:maakavitalaxmi@gmail.com" className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                  <Mail size={16} /> Email Sales
                </a>
                <a href="tel:+9182527539850" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                  <Phone size={16} /> Call Hotline
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-12 rounded-[3rem] shadow-2xl rotate-3">
                 <Store size={60} className="text-white mb-6" />
                 <p className="text-white text-2xl font-black mb-2">Retail Partner Program</p>
                 <p className="text-green-100 opacity-80 text-sm">Join our network of 5,000+ vendors across Asia and the Middle East.</p>
                 <div className="mt-8 pt-8 border-t border-white/20 flex justify-between items-center text-white">
                    <span className="font-bold uppercase text-xs tracking-widest">Apply Now</span>
                    <ArrowRight />
                 </div>
              </div>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>
    </div>
  );
}

/* ================= COMPONENT: BULK PRODUCT CARD ================= */
function BulkProductCard({ product, onAction, isLoading }) {
  const [qty, setQty] = useState(product.minQty);
  
  const totalPrice = product.price * qty;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -12 }}
      className="bg-white rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col group"
    >
      {/* Image Header */}
      <div className="h-72 bg-[#F8F8F8] relative overflow-hidden flex items-center justify-center p-12">
        <div className="absolute top-6 right-6 z-10 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          Min: {product.minQty}u
        </div>
        <motion.img 
          whileHover={{ scale: 1.15, rotate: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={product.image} 
          className="h-full object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)]" 
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
      </div>

      <div className="p-10">
        <div className="mb-6">
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">{product.title}</h3>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{product.desc}</p>
        </div>

        {/* Dynamic Calculation Area */}
        <div className="bg-gray-50 rounded-[2.5rem] p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] font-black text-green-600 uppercase mb-1">Price Per kg</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
                <span className="text-xs text-gray-300 font-bold line-through">₹{product.retail}</span>
              </div>
            </div>
            
            <div className="flex items-center bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
               <button onClick={() => setQty(Math.max(product.minQty, qty - 10))} className="w-10 h-10 flex items-center justify-center font-black hover:bg-gray-100 rounded-xl transition-all">-</button>
               <span className="w-12 text-center font-black text-sm">{qty}</span>
               <button onClick={() => setQty(qty + 10)} className="w-10 h-10 flex items-center justify-center font-black hover:bg-gray-100 rounded-xl transition-all">+</button>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtotal</span>
            <span className="text-xl font-black text-gray-900">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            disabled={isLoading}
            onClick={() => onAction(product, qty, false)}
            className="bg-white border-2 border-gray-900 text-gray-900 py-4 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50"
          >
            {isLoading ? "..." : <ShoppingCart size={16} />} Cart
          </button>
          
          <button 
            disabled={isLoading}
            onClick={() => onAction(product, qty, true)}
            className="bg-green-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-green-100 disabled:opacity-50"
          >
            <Zap size={16} fill="currentColor" /> Buy Now
          </button>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-2">
          <Info size={12} className="text-gray-300" />
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">Bulk discounts automatically applied at checkout</p>
        </div>
      </div>
    </motion.div>
  );
}

const initialFormState = {
  companyName: "",
  gstNumber: "",
  contactName: "",
  phoneNumber: "",
  email: "",
  quantity: "",
  message: "",
};

export default function B2B() {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Wholesale enquiry submitted. Our team will contact you shortly.");
    setForm(initialFormState);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] pt-24 pb-20">
      <Toaster position="top-right" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <section className="w-screen bg-[#0b3b2a] text-white py-14 sm:py-16 mx-[calc(50%-50vw)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-100 mb-3">
              Wholesale &amp; B2B Partnership
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-3">
              Partner with us for bulk orders and grow your business with premium
              quality traditional snacks.
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto mb-6">
              Consistent quality, reliable supply, and tailor-made solutions for retailers, distributors,
              and food service businesses across India and abroad.
            </p>
            <button
              type="button"
              onClick={() => {
                const element = document.getElementById("wholesale-form");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="inline-flex items-center justify-center rounded-full bg-amber-300 text-[#0b3b2a] text-sm font-semibold px-6 py-3 shadow-md hover:bg-amber-200 transition-colors"
            >
              Become a Wholesale Partner
            </button>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a] text-center">
            Why Partner With Us
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-2xl mx-auto">
            Benefits of choosing Maa Kavita Lakxmi as your wholesale partner.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center bg-white rounded-2xl px-6 py-8 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mb-4">
                <Package size={22} />
              </div>
              <h3 className="text-sm font-semibold text-[#0b3b2a] mb-2">Bulk Supply</h3>
              <p className="text-xs text-gray-600">
                Large-scale production capacity to fulfill small and high-volume wholesale orders.
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-white rounded-2xl px-6 py-8 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mb-4">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="text-sm font-semibold text-[#0b3b2a] mb-2">Custom Packaging</h3>
              <p className="text-xs text-gray-600">
                Flexible packaging sizes and private labelling options tailored to your brand.
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-white rounded-2xl px-6 py-8 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mb-4">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-sm font-semibold text-[#0b3b2a] mb-2">Dedicated Support</h3>
              <p className="text-xs text-gray-600">
                A dedicated account manager to assist with pricing, dispatch and documentation.
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-white rounded-2xl px-6 py-8 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mb-4">
                <Truck size={22} />
              </div>
              <h3 className="text-sm font-semibold text-[#0b3b2a] mb-2">Flexible Delivery</h3>
              <p className="text-xs text-gray-600">
                Strong logistics network for timely delivery to your location across regions.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-[#F7F1E6] px-6 sm:px-10 py-10 border border-[#E5D7C3]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a] text-center">
            Volume-Based Pricing
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-2xl mx-auto">
            Competitive pricing tiers for different wholesale needs.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl border border-[#E5D7C3] px-6 py-7 text-center shadow-sm">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0b3b2a]">
                10% OFF
              </p>
              <p className="mt-2 text-lg font-semibold text-[#0b3b2a]">10–50 kg</p>
              <p className="mt-2 text-xs text-gray-600">
                Perfect for retail shops and boutique stores starting with trial orders.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-[1.5px] border-[#D8C7AE] px-6 py-7 text-center shadow-sm">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0b3b2a]">
                15% OFF
              </p>
              <p className="mt-2 text-lg font-semibold text-[#0b3b2a]">50–100 kg</p>
              <p className="mt-2 text-xs text-gray-600">
                Ideal for supermarkets, distributors and multi-outlet partners.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5D7C3] px-6 py-7 text-center shadow-sm">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0b3b2a]">
                20% OFF
              </p>
              <p className="mt-2 text-lg font-semibold text-[#0b3b2a]">200+ kg</p>
              <p className="mt-2 text-xs text-gray-600">
                Best suited for large distributors, exporters and institutional buyers.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-600 text-center">
            Minimum Order Quantity (MOQ): 10 kg. Special rates available for export and contract orders.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a] text-center">
            Our B2B Clients
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-2xl mx-auto">
            Trusted by leading businesses across India and international markets.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Premium Retail Stores",
              "Modern Trade & Supermarkets",
              "Resellers & Kirana Stores",
              "Corporate Offices",
              "Cafes & Snack Counters",
              "Export Partners",
              "Online Marketplaces",
            ].map((label) => (
              <div
                key={label}
                className="rounded-full border border-[#DBCBB5] bg-white px-4 py-2 text-xs font-medium text-[#0b3b2a]"
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        <section
          id="wholesale-form"
          className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start"
        >
          <div className="bg-white rounded-3xl px-6 sm:px-8 py-8 shadow-sm border border-[#E5D7C3]">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0b3b2a]">
              Become a Wholesale Partner
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl">
              Fill out the form below and our B2B team will get in touch with you
              within 24–48 working hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Enter company name"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Enter GST (optional)"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Full name"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="WhatsApp / mobile number"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Business email"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Required Quantity (Monthly)
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a]"
                  placeholder="Example: 50–100 kg per month"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#0b3b2a] mb-1.5">
                  Message / Requirements
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-xl border border-[#E0D1BC] bg-[#FAF6EF] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b2a] resize-none"
                  placeholder="Tell us about your requirements, product interest, and delivery location."
                />
              </div>

              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#0b3b2a] text-white text-sm font-semibold px-6 py-3.5 hover:bg-[#0b3b2a] transition-colors"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#F7F1E6] rounded-3xl px-6 sm:px-8 py-8 border border-[#E5D7C3]">
            <h3 className="text-base sm:text-lg font-semibold text-[#0b3b2a]">
              Direct Contact
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              For immediate assistance, reach out to our B2B team using the details below.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b3b2a] border border-[#DCCCB6]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b3b2a] uppercase tracking-[0.18em]">
                    Call / WhatsApp
                  </p>
                  <a
                    href="tel:+918252753850"
                    className="block mt-1 text-sm font-medium text-[#0b3b2a]"
                  >
                    +91 82527 53850
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b3b2a] border border-[#DCCCB6]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0b3b2a] uppercase tracking-[0.18em]">
                    Email
                  </p>
                  <a
                    href="mailto:maakavitalaxmi@gmail.com"
                    className="block mt-1 text-sm font-medium text-[#0b3b2a]"
                  >
                    maakavitalaxmi@gmail.com
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E0D1BC]">
                <p className="text-xs font-semibold text-[#0b3b2a] uppercase tracking-[0.18em]">
                  Office Address
                </p>
                <p className="mt-1 text-xs text-gray-700 leading-relaxed">
                  Maa Kavita Lakxmi Pvt. Ltd.
                  <br />
                  Kerala, India
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
