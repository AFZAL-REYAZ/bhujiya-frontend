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

export default function B2B() {
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-green-100">
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