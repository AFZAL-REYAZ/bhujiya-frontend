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

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product }) => {
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
    >
      <div className="h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold text-gray-900">
            ₹ {product.price}
          </p>
          <span className="text-xs text-gray-500">100 g</span>
        </div>

        <button
          disabled={isAdding}
          onClick={() => handleAdd(false)}
          className="mt-2 w-full inline-flex items-center justify-center bg-[#0b3b2a] text-white text-sm font-semibold py-2.5 rounded-full hover:bg-green-800 disabled:opacity-60 transition-colors"
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </button>
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
// const TrendingProducts = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const trendingProducts = [
//     {
//       id: "trend1",
//       title: "Spicy Masala Chips",
//       price: "95",
//       image: bananaChilli,
//       tag: "HOT",
//       sales: "1.2K sold",
//     },
//     {
//       id: "trend2",
//       title: "Classic Salted Chips",
//       price: "85",
//       image: bananaChips,
//       tag: "BEST VALUE",
//       sales: "2.5K sold",
//     },
//     {
//       id: "trend3",
//       title: "Extra Crispy Chips",
//       price: "110",
//       image: bananach5,
//       tag: "PREMIUM",
//       sales: "850 sold",
//     },
//     {
//       id: "trend4",
//       title: "Sweet & Spicy Mix",
//       price: "120",
//       image: bananaPowder,
//       tag: "NEW",
//       sales: "320 sold",
//     },
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + trendingProducts.length) % trendingProducts.length);
//   };

//   return (
//     <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header with Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-2">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <TrendingUp className="w-8 h-8 text-green-600" />
//               <span className="text-green-600 font-semibold">TRENDING NOW</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               Most Loved by
//               <span className="text-green-600"> Foodies</span>
//             </h2>
//           </div>

//           {/* Navigation Controls */}
//           <div className="flex items-center gap-4 mt-0 md:mt-0">
//             <button
//               onClick={prevSlide}
//               className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>
//         </div>

//         {/* Carousel */}
//         <div className="relative">
//           <div className="overflow-hidden rounded-3xl">
//             <motion.div
//               animate={{ x: `-${currentIndex * 100}%` }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="flex"
//             >
//               {trendingProducts.map((product) => (
//                 <div key={product.id} className="w-full flex-shrink-0">
//                   <div className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-r from-white to-gray-50 p-2 rounded-3xl">
                    
//                     {/* Product Info */}
//                     <div>
//                       {/* Tag */}
//                       <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
//                         {product.tag}
//                       </span>

//                       <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                         {product.title}
//                       </h3>

//                       {/* Features List */}
//                       <ul className="space-y-4 mb-8">
//                         {[
//                           "Extra crispy texture",
//                           "Perfect spice blend",
//                           "Sealed for freshness",
//                           "No MSG or additives",
//                         ].map((feature, i) => (
//                           <li key={i} className="flex items-center gap-3">
//                             <CheckCircle className="w-5 h-5 text-green-500" />
//                             <span className="text-gray-700">{feature}</span>
//                           </li>
//                         ))}
//                       </ul>

//                       {/* Price & Sales */}
//                       <div className="flex items-center justify-between mb-2">
//                         <div>
//                           <div className="text-2xl font-bold text-gray-900 mb-2">
//                             ₹ {product.price}
//                           </div>
//                           <div className="flex items-center text-gray-600">
//                             <Users className="w-4 h-4 mr-2" />
//                             <span>{product.sales} this month</span>
//                           </div>
//                         <div className="flex items-center pt-2">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star
//                               key={star}
//                               className="w-5 h-5 fill-yellow-400 text-yellow-400"
//                             />
//                           ))}
//                         </div>
//                         </div>
//                       </div>

//                       <button className="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-full font-bold  hover:shadow-2xl hover:scale-105 transition-all">
//                         Try It Now
//                       </button>
//                     </div>

//                     {/* Product Image */}
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       className="order-1 lg:order-2 relative flex justify-center"
//                     >
//                       <div className="relative w-full max-w-lg lg:max-w-none">
//                         <img
//                           src={product.image}
//                           alt={product.title}
//                           className="
//                             w-full
//                             h-auto
//                             max-h-[70vh]
//                             object-contain
//                             rounded-2xl
//                             shadow-2xl
//                           "
//                           style={{
//                             maxHeight: 'min(70vh, 500px)'
//                           }}
//                         />

//                       </div>
//                     </motion.div>

//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Indicators */}
//           <div className="flex justify-center gap-3 mt-12">
//             {trendingProducts.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   index === currentIndex
//                     ? "bg-green-600 w-10"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

/* ================= LANDING PAGE ================= */
export default function Landing() {
  const featuredProducts = [
    {
      id: "feat1",
      title: "Signature Banana Chips",
      price: "290",
      image: chilliBana,
    },
    {
      id: "feat2",
      title: "Natural Banana Powder",
      price: "500",
      image: bananaPowder,
    },
    {
      id: "feat3",
      title: "Banana Length Pepper",
      price: "81",
      image: bananach5,
    },
    {
      id: "best2",
      title: "Spicy Banana Chips",
      price: "81",
      image: bananaChilli,
    },{
      id: "best4",
      title: "Banana Salty Chips",
      price: "81",
      image: bananaSalti,
    },
  ];

  const bestSellers = [
    {
      id: "best1",
      title: "Ultra Thin Banana Chips",
      price: "151",
      image: chilliBana,
    },
    {
      id: "best2",
      title: "Spicy Banana Chips",
      price: "81",
      image: bananaChilli,
    },
    {
      id: "best3",
      title: "Classic Banana Chips",
      price: "151",
      image: bananaChips,
    },
    {
      id: "best4",
      title: "Banana Salty Chips",
      price: "81",
      image: bananaSalti,
    },
    {
      id: "best5",
      title: "Banana Powder",
      price: "500",
      image: bananaPowder,
    },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [bananaChips, bananaChilli, chilliBana, bananaPowder, bananaSalti, bananach5];
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
                Handcrafted in small batches using traditional recipes and pure coconut oil.
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center rounded-full bg-green-800 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-900 transition-colors border border-white/20">
                  Shop Now
                </button>
                <button className="inline-flex items-center justify-center rounded-full border border-emerald-100/70 px-8 py-3 text-sm font-semibold text-emerald-50 bg-white/10 hover:bg-white/15 transition-colors">
                  Explore Wholesale
                </button>
              </div>
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
              <ProductCard key={p.id} product={p} />
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
              <ProductCard key={p.id} product={p} />
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
    </div>
  );
}
