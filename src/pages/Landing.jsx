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
  Heart,
  TrendingUp,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// Assets
import bhujiya from "../assets/bhujiya.webp";
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";
import bananach5 from "../assets/banana/bananach5.jpeg";

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
      whileHover={{ y: -8, scale: 1.02 }}
      className="
        bg-white
        rounded-2xl
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        border border-gray-100
        overflow-hidden
        flex flex-col
        relative
        group
      "
    >
      {/* Favorite Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
      >
        <Heart
          className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
        />
      </button>

      {/* Image with Overlay */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center h-64 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={product.image}
          alt={product.title}
          className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow text-left space-y-3">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold ml-1">4.8</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline">
          <p className="text-green-700 font-bold text-2xl">
            ₹ {product.price}
          </p>
          <span className="text-sm text-gray-500 ml-2">/Kg</span>
          <span className="ml-auto text-sm text-gray-400 line-through">
            ₹ 120
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            Fresh Oil
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            No Preservatives
          </span>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
            Fresh Daily
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            disabled={isAdding}
            onClick={() => handleAdd(false)}
            className="
              flex-1
              bg-gradient-to-r from-gray-900 to-black text-white
              py-3 rounded-xl text-sm font-semibold
              hover:shadow-lg
              transition-all
              hover:scale-[1.02]
              disabled:opacity-50
            "
          >
            {isAdding ? (
              <Loader2 className="animate-spin w-5 mx-auto" />
            ) : (
              "Add to Cart"
            )}
          </button>

          <button
            onClick={() => handleAdd(true)}
            className="
              flex-1
              bg-gradient-to-r from-green-600 to-emerald-700 text-white
              py-3 rounded-xl text-sm font-semibold
              hover:shadow-lg
              transition-all
              hover:scale-[1.02]
            "
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= NEW SECTIONS ================= */

/* 1. LIMITED TIME OFFER SECTION */
const LimitedTimeOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-300 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">FLASH SALE</span>
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              40% OFF
              <br />
              <span className="text-orange-600">Limited Time Offer</span>
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Stock up on your favorite banana snacks. This offer ends soon!
            </p>

            {/* Timer */}
            <div className="mb-10">
              <p className="text-gray-500 mb-4">Offer ends in:</p>
              <div className="flex gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-gradient-to-b from-gray-900 to-black text-white text-3xl font-bold w-16 h-16 rounded-xl flex items-center justify-center">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <p className="text-gray-600 text-sm mt-2 capitalize">{unit}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
              Shop Now & Save
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative">
              <motion.img
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                src={chilliBana}
                alt="Special Offer"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                Save ₹36
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

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

/* 3. TRENDING PRODUCTS CAROUSEL */
const TrendingProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trendingProducts = [
    {
      id: "trend1",
      title: "Spicy Masala Chips",
      price: "95",
      image: bananaChilli,
      tag: "HOT",
      sales: "1.2K sold",
    },
    {
      id: "trend2",
      title: "Classic Salted Chips",
      price: "85",
      image: bananaChips,
      tag: "BEST VALUE",
      sales: "2.5K sold",
    },
    {
      id: "trend3",
      title: "Extra Crispy Chips",
      price: "110",
      image: bananach5,
      tag: "PREMIUM",
      sales: "850 sold",
    },
    {
      id: "trend4",
      title: "Sweet & Spicy Mix",
      price: "120",
      image: bananaPowder,
      tag: "NEW",
      sales: "320 sold",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingProducts.length) % trendingProducts.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-green-600 font-semibold">TRENDING NOW</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Most Loved by
              <span className="text-green-600"> Foodies</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-0 md:mt-0">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {trendingProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-r from-white to-gray-50 p-2 rounded-3xl">
                    
                    {/* Product Info */}
                    <div>
                      {/* Tag */}
                      <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        {product.tag}
                      </span>

                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        {product.title}
                      </h3>

                      {/* Features List */}
                      <ul className="space-y-4 mb-8">
                        {[
                          "Extra crispy texture",
                          "Perfect spice blend",
                          "Sealed for freshness",
                          "No MSG or additives",
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price & Sales */}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-2xl font-bold text-gray-900 mb-2">
                            ₹ {product.price}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{product.sales} this month</span>
                          </div>
                        <div className="flex items-center pt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-5 h-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        </div>
                      </div>

                      <button className="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-full font-bold  hover:shadow-2xl hover:scale-105 transition-all">
                        Try It Now
                      </button>
                    </div>

                    {/* Product Image */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="order-1 lg:order-2 relative flex justify-center"
                    >
                      <div className="relative w-full max-w-lg lg:max-w-none">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="
                            w-full
                            h-auto
                            max-h-[70vh]
                            object-contain
                            rounded-2xl
                            shadow-2xl
                          "
                          style={{
                            maxHeight: 'min(70vh, 500px)'
                          }}
                        />

                      </div>
                    </motion.div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {trendingProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-green-600 w-10"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
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
      price: "90",
      image: chilliBana,
    },
    {
      id: "feat2",
      title: "Natural Banana Powder",
      price: "90",
      image: bananaPowder,
    },
    {
      id: "feat3",
      title: "Banana Length Pepper",
      price: "90",
      image: bananach5,
    },
  ];

  const bestSellers = [
    {
      id: "best1",
      title: "Ultra Thin Banana Chips",
      price: "90",
      image: chilliBana,
    },
    {
      id: "best2",
      title: "Spicy Banana Chips",
      price: "90",
      image: bananaChilli,
    },
    {
      id: "best3",
      title: "Classic Banana Chips",
      price: "90",
      image: bananaChips,
    },
    {
      id: "best4",
      title: "Banana Salti Chips",
      price: "90",
      image: bananaSalti,
    },
    {
      id: "best5",
      title: "Banana Powder",
      price: "90",
      image: bananaPowder,
    },
  ];

  return (
    <div className="font-sans overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="min-h-screen pt-40 bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-400 rounded-full mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
            >
              <Award className="w-5 h-5" />
              <span>Authentic Kerala Recipe Since 2015</span>
            </motion.div>

            <h1 className="text-3xl font-black mb-8 leading-tight">
              खावो जल्दी रहो
              <span className="text-yellow-300"> Healthy</span>
              <br />
              
            </h1>
            
            <p className="text-xl text-red-100 mb-10 max-w-2xl">
              Experience the perfect crunch of traditional banana snacks, 
              crafted with love and fried in pure coconut oil for that authentic taste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-white text-red-800 px-5 py-0 rounded-full font-bold text-xl hover:scale-105 hover:shadow-2xl transition-all">
                Shop Collection
              </button>
              <button className="border-2 border-white/30 text-white px-5 py-0 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all">
                Watch Story
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { icon: <ShieldCheck />, text: "100% Natural" },
                { icon: <Truck />, text: "Free Shipping" },
                { icon: <Clock />, text: "Fresh Daily" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3 text-red-100">
                  <div className="bg-white/10 p-2 rounded-lg">
                    {badge.icon}
                  </div>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <motion.img
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut"
              }}
              src={bhujiya}
              className="w-full max-w-2xl mx-auto drop-shadow-2xl"
              alt="Banana Chips"
            />
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -top-6 -left-6 bg-white text-gray-900 px-6 py-3 rounded-2xl shadow-2xl"
            >
              <div className="font-bold text-2xl">4.8★</div>
              <div className="text-sm">Rating</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
            >
              <div className="font-bold text-2xl">10K+</div>
              <div className="text-sm">Sold</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Featured
            <span className="text-green-600"> Favorites</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated selection of our most loved banana snacks
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ================= NEW: LIMITED TIME OFFER ================= */}
      <LimitedTimeOffer />

      {/* ================= NEW: TRENDING PRODUCTS CAROUSEL ================= */}
      <TrendingProducts />

      {/* ================= BEST SELLERS ================= */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Best
              <span className="text-green-600"> Sellers</span>
            </h2>
            <p className="text-xl text-gray-600">
              What our customers love the most
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEW: HEALTH BENEFITS ================= */}
      <HealthBenefits />

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-16 text-gray-900">
            Why Foodies Choose
            <span className="text-green-600"> Khawo Jaldi</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              {
                icon: <Leaf className="w-12 h-12" />,
                title: "100% Natural",
                desc: "No artificial additives",
                color: "text-green-600",
              },
              {
                icon: <ShieldCheck className="w-12 h-12" />,
                title: "Hygienic Packing",
                desc: "Sealed for freshness",
                color: "text-blue-600",
              },
              {
                icon: <Truck className="w-12 h-12" />,
                title: "Fast Delivery",
                desc: "Across India in 2-4 days",
                color: "text-orange-600",
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Fresh Daily",
                desc: "Made fresh every morning",
                color: "text-purple-600",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="space-y-4 group"
              >
                <div className={`${item.color} mb-4 inline-flex p-4 rounded-2xl bg-gray-50 group-hover:shadow-xl transition-all`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Love from
              <span className="text-green-600"> Our Foodies</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy customers
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
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xl">
                    {review.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-gray-600 text-sm">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic text-lg">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-32 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white text-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 w-full h-64 bg-gradient-to-r from-yellow-400 to-orange-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold mb-8">
            Ready for a
            <span className="text-yellow-300"> Crunch</span>?
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join 10,000+ happy foodies enjoying authentic banana snacks delivered fresh to their doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-gray-900 px-12 py-5 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-3 justify-center">
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all">
              View All Products
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-12 mt-16 text-gray-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div>Natural Ingredients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24h</div>
              <div>Freshness Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5000+</div>
              <div>5★ Reviews</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}