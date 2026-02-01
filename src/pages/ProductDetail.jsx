import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, Heart, Star, Shield, Truck, 
  Clock, Award, Check, Plus, Minus,
  ChevronRight, Zap, Leaf, Gem, Sparkles,
  Package, Crown
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
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState({});

  const products = [
    {
      id: "p1",
      title: "Hot Chilli Banana Chips",
      subtitle: "Spicy & Crunchy",
      price: 90,
      mrp: 150,
      image: chilliBana,
      tag: "Best Seller",
      rating: 4.9,
      reviews: "2.1k",
      features: ["Farm Fresh", "No Preservatives", "Zero Trans Fat"],
      color: "rose",
      badgeColor: "bg-rose-600",
      icon: <Sparkles className="w-3.5 h-3.5" />
    },
    {
      id: "p2",
      title: "Classic Golden Chips",
      subtitle: "Traditional Taste",
      price: 90,
      mrp: 120,
      image: bananaChips,
      tag: "Traditional",
      rating: 4.8,
      reviews: "1.8k",
      features: ["100% Coconut Oil", "Sea Salted", "Hand-picked"],
      color: "amber",
      badgeColor: "bg-amber-600",
      icon: <Award className="w-3.5 h-3.5" />
    },
    {
      id: "p3",
      title: "Pure Banana Powder",
      subtitle: "Nutrient Powerhouse",
      price: 90,
      mrp: 180,
      image: bananaPowder,
      tag: "Superfood",
      rating: 5.0,
      reviews: "950",
      features: ["Gluten Free", "Immunity Booster", "100% Natural"],
      color: "emerald",
      badgeColor: "bg-emerald-600",
      icon: <Leaf className="w-3.5 h-3.5" />
    },
    {
      id: "p4",
      title: "Himalayan Salted Delite",
      subtitle: "Extra Crispy",
      price: 90,
      mrp: 130,
      image: bananaSalti,
      tag: "Gourmet",
      rating: 4.7,
      reviews: "1.1k",
      features: ["Light & Airy", "Low Sodium", "Himalayan Salt"],
      color: "sky",
      badgeColor: "bg-sky-600",
      icon: <Gem className="w-3.5 h-3.5" />
    },
    {
      id: "p5",
      title: "Peri Peri Spiced Chips",
      subtitle: "Global Fusion",
      price: 90,
      mrp: 160,
      image: bananaChilli,
      tag: "New Arrival",
      rating: 4.9,
      reviews: "560",
      features: ["Zesty Flavor", "Global Fusion", "Limited"],
      color: "orange",
      badgeColor: "bg-orange-600",
      icon: <Zap className="w-3.5 h-3.5" />
    }
  ];

  const handleAction = async (product, redirectToCart = false) => {
    const token = localStorage.getItem("token");
    if (!token) { 
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
        quantity: quantity
      }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (redirectToCart) {
        navigate('/cart');
      } else {
        alert(`Added to cart!`);
      }
    } catch (err) { 
      alert("Error!"); 
    } finally { 
      setLoadingId(null); 
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-full mb-6">
            <Crown className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              Premium Collection
            </span>
          </div>
          
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Crafted with
            <span className="font-medium text-gray-900 ml-2">Precision</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Each product embodies our commitment to quality, tradition, and exceptional taste. 
            Experience the difference of handcrafted excellence.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Image Column */}
                  <div className="relative">
                    {/* Badge */}
                    <div className={`absolute top-0 left-0 z-10 ${product.badgeColor} text-white px-3 py-1.5 rounded-r-lg text-xs font-medium uppercase tracking-wider flex items-center gap-1.5`}>
                      {product.icon}
                      {product.tag}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-0 right-0 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${
                          favorites[product.id] 
                            ? "fill-rose-500 text-rose-500" 
                            : "text-gray-400 hover:text-rose-400"
                        }`}
                      />
                    </button>

                    {/* Product Image */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/2 to-transparent"></div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="flex flex-col">
                    {/* Title & Subtitle */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-medium text-gray-900 mb-1">
                        {product.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, i) => (
                          <div 
                            key={i} 
                            className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg"
                          >
                            <Check className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        {/* Price Section */}
                        <div>
                          <div className="flex items-baseline gap-3 mb-1">
                            <span className="text-3xl font-light text-gray-900">
                              ₹{product.price}
                            </span>
                            <span className="text-lg text-gray-300 line-through font-medium">
                              ₹{product.mrp}
                            </span>
                          </div>
                          <div className="text-xs text-rose-600 font-medium">
                            Save ₹{product.mrp - product.price}
                          </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex items-center gap-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAction(product, false)}
                              disabled={loadingId === product.id}
                              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              Add
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAction(product, true)}
                              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg text-sm font-medium hover:from-rose-600 hover:to-rose-700 transition-all flex items-center gap-2"
                            >
                              Buy Now
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-3">
              Our Commitment to
              <span className="font-medium text-gray-900 ml-2">Excellence</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Every step of our process is designed to deliver the finest quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-5 h-5" />,
                title: "Certified Quality",
                description: "ISO & FSSAI certified manufacturing process",
                color: "text-blue-500"
              },
              {
                icon: <Package className="w-5 h-5" />,
                title: "Fresh Packaging",
                description: "Sealed for maximum freshness and hygiene",
                color: "text-emerald-500"
              },
              {
                icon: <Truck className="w-5 h-5" />,
                title: "Fast Delivery",
                description: "Shipped within 24 hours across India",
                color: "text-amber-500"
              },
              {
                icon: <Award className="w-5 h-5" />,
                title: "Premium Selection",
                description: "Only the finest ingredients make the cut",
                color: "text-purple-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-gray-200 transition-all"
              >
                <div className={`${feature.color} mb-4 inline-flex p-3 rounded-lg bg-gray-50`}>
                  {feature.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
            <div className="max-w-lg mx-auto">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Experience Authentic Taste
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Join thousands of customers who trust us for premium, healthy snacks
              </p>
              <button className="px-8 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors inline-flex items-center gap-2">
                Shop All Products
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Cart Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-40"
        onClick={() => navigate('/cart')}
      >
        <ShoppingBag className="w-5 h-5" />
      </motion.button>
    </div>
  );
}