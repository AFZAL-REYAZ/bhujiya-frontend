import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Zap,
  Loader2,
  Star,
  Award,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// Assets
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";
import bananach5 from "../assets/banana/bananach5.jpeg";

import crousel1 from "../assets/carousel/crousel1.jpeg";
import crousel2 from "../assets/carousel/crousel2.jpeg";
import crousel3 from "../assets/carousel/crousel3.jpeg";
import crousel4 from "../assets/carousel/crousel4.jpeg";
import crousel5 from "../assets/carousel/crousel5.jpeg";
import crousel6 from "../assets/carousel/crousel6.jpeg";
import ContactForm from "../components/ContactForm";
import { sendEmail } from "../utils/email";
/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product, onOpen }) => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (redirect = false) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/auth");

    setIsAdding(true);

    try {
      await API.post(
        "/cart/add",
        {
          productId: product.id,
          name: product.title,
          price: Number(product.price),
          image: product.image,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      redirect ? navigate("/cart") : alert("Added to cart");
    } catch {
      alert("Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
      onClick={() => onOpen && onOpen(product)}
    >
      <div
        className="h-72 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer"
        
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 cursor-pointer"
          onClick={() => onOpen && onOpen(product)}
        >
          {product.title}
        </h3>

        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold text-gray-900">
            ₹ {product.price}
          </p>
          <span className="text-xs text-gray-500">{product.quantity}</span>
        </div>

        <button
          disabled={isAdding}
          onClick={() => onOpen && onOpen(product)}
          // onClick={() => handleAdd(false)}
          className="mt-2 w-full inline-flex items-center justify-center bg-[#0b3b2a] text-white text-sm font-semibold py-2.5 rounded-full hover:bg-green-800 disabled:opacity-60 transition-colors"
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Get Quate
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

/* ================= NEW SECTIONS ================= */

/* 1. LIMITED TIME OFFER SECTION */
// const LimitedTimeOffer = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 4,
//     minutes: 30,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         const { hours, minutes, seconds } = prev;
//         if (seconds > 0) return { ...prev, seconds: seconds - 1 };
//         if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
//         if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
//         return prev;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="py-20 bg-gradient-to-r from-orange-50 to-amber-50 relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-orange-300 rounded-full -translate-x-32 -translate-y-32"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full translate-x-48 translate-y-48"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center">
          
//           {/* Left Content */}
//           <div>
//             <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6">
//               <Zap className="w-4 h-4" />
//               <span className="text-sm font-semibold">FLASH SALE</span>
//             </div>

//             <h2 className="text-5xl font-bold text-gray-900 mb-6">
//               40% OFF
//               <br />
//               <span className="text-orange-600">Limited Time Offer</span>
//             </h2>

//             <p className="text-gray-600 text-lg mb-8">
//               Stock up on your favorite banana snacks. This offer ends soon!
//             </p>

//             {/* Timer */}
//             <div className="mb-10">
//               <p className="text-gray-500 mb-4">Offer ends in:</p>
//               <div className="flex gap-4">
//                 {Object.entries(timeLeft).map(([unit, value]) => (
//                   <div key={unit} className="text-center">
//                     <div className="bg-gradient-to-b from-gray-900 to-black text-white text-3xl font-bold w-16 h-16 rounded-xl flex items-center justify-center">
//                       {value.toString().padStart(2, '0')}
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2 capitalize">{unit}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
//               Shop Now & Save
//             </button>
//           </div>

//           {/* Right Image */}
//           <div className="relative">
//             <div className="relative">
//               <motion.img
//                 animate={{ y: [0, -15, 0] }}
//                 transition={{ repeat: Infinity, duration: 4 }}
//                 src={chilliBana}
//                 alt="Special Offer"
//                 className="rounded-2xl shadow-2xl"
//               />
//               <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
//                 Save ₹36
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

/* 2. HEALTH BENEFITS SECTION */
const HealthBenefits = () => {
  const benefits = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Natural",
      description: "No artificial colors, flavors, or preservatives",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Rich in Potassium",
      description: "Natural source of essential minerals",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fresh Daily",
      description: "Made fresh every day for maximum crispiness",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Heart Healthy",
      description: "Fried in coconut oil, good for heart health",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Healthy Snacking,
            <span className="text-green-600"> Happy Living</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our banana snacks are not just delicious, they're packed with health benefits
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${benefit.bgColor} rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`${benefit.color} mb-6 inline-flex p-4 rounded-2xl bg-white`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <p className="text-green-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-green-100">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24h</div>
              <p className="text-green-100">Freshness Guarantee</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-green-100">Cities Served</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


/* ================= LANDING PAGE ================= */
export default function Landing() {
  const featuredProducts = [
    {
      id: "feat1",
      title: "Signature Banana Chips",
      price: "290",
      image: chilliBana,
      quantity: "1 Kg"
    },
    {
      id: "feat2",
      title: "Natural Banana Powder",
      price: "500",
      image: bananaPowder,
      quantity: "1 Kg"
    },
    {
      id: "feat3",
      title: "Banana Length Pepper",
      price: "81",
      image: bananach5,
      quantity: "100 g"
    },
    {
      id: "best2",
      title: "Spicy Banana Chips",
      price: "81",
      image: bananaChilli,
      quantity: "100 g"
    },{
      id: "best4",
      title: "Banana Salty Chips",
      price: "81",
      image: bananaSalti,
      quantity: "100 g"
    },
  ];

  const bestSellers = [
    {
      id: "best1",
      title: "Ultra Thin Banana Chips",
      price: "290",
      image: chilliBana,
      quantity: "1 Kg"
    },
    {
      id: "best2",
      title: "Spicy Banana Chips",
      price: "81",
      image: bananaChilli,
      quantity: "100 g"
    },
    {
      id: "best3",
      title: "Classic Banana Chips",
      price: "151",
      image: bananaChips,
      quantity: "100 g"
    },
    {
      id: "best4",
      title: "Banana Salty Chips",
      price: "81",
      image: bananaSalti,
      quantity: "100 g"
    },
    {
      id: "best5",
      title: "Banana Powder",
      price: "500",
      image: bananaPowder,
      quantity: "1 Kg"
    },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const heroImages = [crousel1,crousel2,crousel3,crousel4,crousel5,crousel6];
  const getProductDetails = (prod) => {
    if (!prod) return {};
    const byId = {
      feat1: { brand: "Sonal Foods", packagingSize: "1 Kg", shelfLife: "6 Months", origin: "Made in India", ingredients: "Nendran Banana, Coconut Oil, Salt", vegetarian: "Yes" },
      feat2: { brand: "Sonal Foods", packagingSize: "1 Kg", shelfLife: "6 Months", origin: "Made in India", ingredients: "Raw Banana Powder", vegetarian: "Yes" },
      feat3: { brand: "Sonal Foods", packagingSize: "100 g", shelfLife: "6 Months", origin: "Made in India", ingredients: "Banana, Oil, Pepper, Salt", vegetarian: "Yes" },
      best1: { brand: "Sonal Foods", packagingSize: "1 Kg", shelfLife: "6 Months", origin: "Made in India", ingredients: "Banana, Coconut Oil, Salt", vegetarian: "Yes" },
      best2: { brand: "Sonal Foods", packagingSize: "100 g", shelfLife: "6 Months", origin: "Made in India", ingredients: "Banana, Oil, Red Chilli, Salt", vegetarian: "Yes" },
      best3: { brand: "Sonal Foods", packagingSize: "100 g", shelfLife: "6 Months", origin: "Made in India", ingredients: "Banana, Oil, Sea Salt", vegetarian: "Yes" },
      best4: { brand: "Sonal Foods", packagingSize: "100 g", shelfLife: "6 Months", origin: "Made in India", ingredients: "Banana, Oil, Salt", vegetarian: "Yes" },
      best5: { brand: "Sonal Foods", packagingSize: "1 Kg", shelfLife: "6 Months", origin: "Made in India", ingredients: "Raw Banana Powder", vegetarian: "Yes" },
    };
    return byId[prod.id] || { brand: "Sonal Foods", packagingSize: prod.quantity || "200 g", shelfLife: "6 Months", origin: "Made in India", ingredients: "Maida, Ghee, Oil, Salt", vegetarian: "Yes" };
  };
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-sans overflow-hidden bg-[#f3f2ee]">
      <section className="pt-32 pb-12 bg-[#0b3b2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                <Leaf className="w-4 h-4" />
                Premium Kerala Snacks
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                खावो जल्दी <span className="block text-lime-300">रहो Healthy</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-emerald-100 max-w-xl">
                Handcrafted in small batches using traditional recipes and pure oil.
                Crispy, light and full of authentic South Indian flavour.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-emerald-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  FSSAI Certified Kitchen
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-200" />
                  Pan-India Delivery
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-200" />
                  10K+ Happy Customers
                </div>
              </div>
              {/* <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center rounded-full bg-green-800 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-900 transition-colors border border-white/20">
                  Shop Now
                </button>
                <button className="inline-flex items-center justify-center rounded-full border border-emerald-100/70 px-8 py-3 text-sm font-semibold text-emerald-50 bg-white/10 hover:bg-white/15 transition-colors">
                  Explore Wholesale
                </button>
              </div> */}
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl h-[45vh] sm:h-[55vh] md:h-[65vh]">
                <motion.div
                  animate={{ x: `-${heroIndex * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="flex h-full w-full"
                >
                  {heroImages.map((img, i) => (
                    <div key={i} className="w-full flex-shrink-0 h-full">
                      <div className="relative w-full h-full">
                        <motion.img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 8, repeat: Infinity }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10" />
                      </div>
                    </div>
                  ))}
                </motion.div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${idx === heroIndex ? "w-6 bg-white" : "w-2 bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Curated selection of our most loved banana snacks.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={(prod) => { setSelectedProduct(prod); setShowQuoteModal(true); }} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f5ede0]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-10">
            Quality, authentic, and traditional in every bite.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "100% Homemade",
                desc: "Made fresh in small batches with traditional recipes.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "No Artificial Preservatives",
                desc: "Pure ingredients, no artificial colors or flavors.",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Direct From Kitchen",
                desc: "Fresh snacks shipped straight from our kitchen to you.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md px-6 py-8 flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#0b3b2a]">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Best Sellers
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Our customers’ favorite crunchy treats.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={(prod) => { setSelectedProduct(prod); setShowQuoteModal(true); }} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f5ede0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              What Our Customers Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Loved by foodies across the country.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ravi Kumar",
                role: "Regular Customer",
                text: "The chips taste exactly like my grandmother used to make in Kerala. Perfect crispiness and authentic flavor!",
                rating: 5,
                image: "RK",
              },
              {
                name: "Anita Sharma",
                role: "Food Blogger",
                text: "Packaging is premium and the chips stay fresh for weeks. My go-to snack for family gatherings!",
                rating: 5,
                image: "AS",
              },
              {
                name: "Faiz Ahmed",
                role: "Chef & Food Critic",
                text: "As a chef, I appreciate the quality. Perfect balance of spices and the coconut oil makes all the difference.",
                rating: 5,
                image: "FA",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md p-7"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                    {review.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-600">{review.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-700 italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {showQuoteModal && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex">
              <div className="hidden md:block w-1/3 bg-gray-50 p-4">
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-auto object-contain" />
                </div>
                <p className="mt-3 text-xs text-gray-600">
                  {selectedProduct.title}
                  <br />₹ {selectedProduct.price} / {selectedProduct.quantity}
                </p>
                <div className="mt-3 text-[11px] text-gray-700 space-y-4">
                  {(() => { const d = getProductDetails(selectedProduct); return (
                    <>
                      <p><span className="font-bold">Brand</span>: {d.brand}</p>
                      <p><span className="font-bold">Packaging Size</span>: {d.packagingSize}</p>
                      <p><span className="font-bold">Shelf Life</span>: {d.shelfLife}</p>
                      <p><span className="font-bold">Country of Origin</span>: {d.origin}</p>
                      <p><span className="font-bold">Ingredients</span>: {d.ingredients}</p>
                      <p><span className="font-bold">100% Vegetarian</span>: {d.vegetarian}</p>
                    </>
                  )})()}
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Get Best Quote and quick callback</h3>
                  <button onClick={() => setShowQuoteModal(false)} className="text-gray-500 hover:text-gray-900">✕</button>
                </div>
                <form
                  className="mt-4 grid gap-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const sellerNumber = "917366981951";
                    const text = `Quote/Callback Request\nProduct: ${selectedProduct.title}\nPrice: ₹${selectedProduct.price} / ${selectedProduct.quantity}\nName: ${quoteForm.name}\nMobile: ${quoteForm.mobile}\nEmail: ${quoteForm.email || "N/A"}\nMessage: ${quoteForm.message || ""}`;
                    const subject = `Quote Request: ${selectedProduct.title}`;
                    try {
                      await sendEmail({
                        subject,
                        message: text,
                        fromName: quoteForm.name,
                        fromEmail: quoteForm.email,
                        phone: quoteForm.mobile,
                      });
                    } catch {
                      // ignore - fallback is WhatsApp below
                    }
                    const wa = `https://wa.me/${sellerNumber}?text=${encodeURIComponent(text)}`;
                    window.open(wa, "_blank");
                    setShowQuoteModal(false);
                    setQuoteForm({ name: "", mobile: "", email: "", message: "" });
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">Name</label>
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={quoteForm.mobile}
                        onChange={(e) => setQuoteForm({ ...quoteForm, mobile: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Email (optional)</label>
                    <input
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Message (optional)</label>
                    <textarea
                      rows={3}
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 resize-none"
                      placeholder="Share any specific requirements"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-[#0b3b2a] text-white text-sm font-bold px-6 py-3"
                  >
                    Submit Now
                  </button>
                  <p className="mt-2 text-[11px] text-gray-500">We will contact you on the provided number/email.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ContactForm/>
    </div>
  );
}
