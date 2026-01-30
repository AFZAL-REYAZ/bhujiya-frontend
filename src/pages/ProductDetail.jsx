import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart, Zap, Star, ShieldCheck, Truck, 
  Clock, Award, ChevronRight, CheckCircle2, 
  Package, Leaf, Flame, Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";

// Assets
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const products = [
    {
      id: "p1",
      title: "Signature Hot Chilli Banana Chips",
      price: 90,
      mrp: 150,
      image: chilliBana,
      tag: "Best Seller",
      rating: "4.9",
      reviews: "2,105",
      desc: "Authentic Kerala banana chips infused with stone-ground birds-eye chilli. Every chip is sliced to 1.2mm precision and fried in cold-pressed coconut oil for that legendary crunch.",
      features: ["Farm Fresh", "No Preservatives", "Zero Trans Fat"],
      bg: "from-red-50 to-white",
      icon: <Flame className="text-red-500" size={18} />
    },
    {
      id: "p2",
      title: "Classic Kerala Salted Golden Chips",
      price: 90,
      mrp: 120,
      image: bananaChips,
      tag: "Traditional",
      rating: "4.8",
      reviews: "1,840",
      desc: "The gold standard of snacks. Made from premium Nendran bananas, these chips offer the perfect balance of sea salt and the natural sweetness of ripe bananas.",
      features: ["100% Coconut Oil", "Sea Salted", "Hand-picked Bananas"],
      bg: "from-yellow-50 to-white",
      icon: <Award className="text-yellow-600" size={18} />
    },
    {
      id: "p3",
      title: "Ethakkaya Vyas – Pure Banana Powder",
      price: 90,
      mrp: 180,
      image: bananaPowder,
      tag: "Superfood",
      rating: "5.0",
      reviews: "950",
      desc: "Nutrient-dense raw banana powder. Highly recommended for baby food and fitness smoothies. Processed using traditional sun-drying methods to retain all vitamins.",
      features: ["Gluten Free", "Immunity Booster", "100% Natural"],
      bg: "from-green-50 to-white",
      icon: <Leaf className="text-green-600" size={18} />
    },
    {
      id: "p4",
      title: "Thin-Slice Himalayan Salted Delite",
      price: 90,
      mrp: 130,
      image: bananaSalti,
      tag: "Extra Crispy",
      rating: "4.7",
      reviews: "1,120",
      desc: "Engineered for the ultimate crunch. These ultra-thin slices are seasoned with pink Himalayan salt for a gourmet snacking experience that is light on the stomach.",
      features: ["Light & Airy", "Low Sodium", "Himalayan Salt"],
      bg: "from-blue-50 to-white",
      icon: <Sparkles className="text-blue-500" size={18} />
    },
    {
      id: "p5",
      title: "Peri Peri Spiced Banana Fusion",
      price: 90,
      mrp: 160,
      image: bananaChilli,
      tag: "New Arrival",
      rating: "4.9",
      reviews: "560",
      desc: "A bold fusion of African Piri-Piri spices and South Indian banana chips. Tangy, spicy, and slightly sweet—it's a party in your mouth with every single bite.",
      features: ["Zesty Flavor", "Global Fusion", "Limited Edition"],
      bg: "from-orange-50 to-white",
      icon: <Flame className="text-orange-500" size={18} />
    }
  ];

  const handleAction = async (product, redirectToCart = false) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/auth"); return; }
    setLoadingId(product.id);
    try {
      await API.post("/cart/add", {
        productId: product.id, name: product.title,
        price: product.price, image: product.image, quantity: 1
      }, { headers: { Authorization: `Bearer ${token}` } });
      redirectToCart ? navigate('/cart') : alert("Added to cart!");
    } catch (err) { alert("Error!"); } finally { setLoadingId(null); }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-left border-l-8 border-green-600 pl-6"
        >
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase">
            The <span className="text-green-600">Exclusive</span> <br/> Collection
          </h1>
          <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-sm">Kerala's Finest Handcrafted Snacks</p>
        </motion.div>

        {products.map((product, index) => (
          <motion.div 
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            key={product.id}
            className={`mb-20 bg-gradient-to-br ${product.bg} rounded-[4rem] overflow-hidden shadow-2xl border border-white flex flex-col md:flex-row`}
          >
            {/* LEFT: SMALLER PRODUCT IMAGE */}
            <div className="md:w-1/3 p-12 flex items-center justify-center relative">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-64 h-64 bg-white rounded-[3rem] shadow-xl p-6 flex items-center justify-center relative z-10"
              >
                <img src={product.image} alt={product.title} className="max-h-full object-contain" />
              </motion.div>
              {/* Decorative Circle */}
              <div className="absolute w-48 h-48 bg-white/50 rounded-full blur-3xl -z-0"></div>
            </div>

            {/* RIGHT: DETAILED DESCRIPTION & ACTIONS */}
            <div className="md:w-2/3 p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  {product.icon} {product.tag}
                </span>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-black text-gray-900">{product.rating}</span>
                  <Star size={12} className="text-yellow-400" fill="currentColor" />
                </div>
                <span className="text-xs font-bold text-gray-400">({product.reviews} Reviews)</span>
              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">{product.title}</h2>
              
              <p className="text-gray-500 font-medium leading-relaxed mb-8 text-lg">
                {product.desc}
              </p>

              {/* FEATURES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/60 p-3 rounded-2xl border border-white/50">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-[10px] font-black uppercase text-gray-700 tracking-tighter">{feat}</span>
                  </div>
                ))}
              </div>

              {/* PRICE & BUTTONS */}
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-100">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Final Offer Price</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-gray-900">₹{product.price}</span>
                    <span className="text-xl text-gray-300 line-through font-bold">₹{product.mrp}</span>
                  </div>
                </div>

                <div className="flex gap-4 flex-grow max-w-md">
                  <button 
                    onClick={() => handleAction(product, false)}
                    className="flex-1 bg-white border-2 border-gray-900 text-gray-900 py-4 rounded-2xl font-black uppercase text-xs hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} /> Add
                  </button>
                  <button 
                    onClick={() => handleAction(product, true)}
                    className="flex-1 bg-[#fb641b] text-white py-4 rounded-2xl font-black uppercase text-xs hover:bg-[#e65a16] transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                  >
                    <Zap size={18} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* SHOP FOOTER FEATURES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32">
          {[
            { icon: <Truck />, title: "Free Shipping", sub: "On orders above ₹500" },
            { icon: <ShieldCheck />, title: "100% Secure", sub: "Encrypted Payments" },
            { icon: <Clock />, title: "Fresh Delivery", sub: "Dispatched in 24hrs" },
            { icon: <Package />, title: "Bulk Orders", sub: "Available for Events" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 text-center shadow-sm">
              <div className="text-green-600 flex justify-center mb-4">{item.icon}</div>
              <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">{item.title}</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}