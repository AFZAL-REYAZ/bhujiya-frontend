import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  ShieldCheck,
  Truck,
  Zap,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// Assets (UNCHANGED)
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

  const handleAdd = async (redirect = false) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }

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

      redirect ? navigate("/cart") : alert("Added to cart 🛒");
    } catch {
      alert("Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center">
        <img
          src={product.image}
          className="w-full h-full object-contain p-5"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="font-bold text-sm md:text-base mb-2">
          {product.title}
        </h3>

        <p className="text-green-700 font-black text-xl mb-4">
          ₹{product.price}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={isAdding}
            onClick={() => handleAdd(false)}
            className="bg-yellow-500 hover:bg-yellow-600 transition text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center"
          >
            {isAdding ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Add"
            )}
          </button>

          <button
            onClick={() => handleAdd(true)}
            className="bg-orange-600 hover:bg-orange-700 transition text-white py-2 rounded-xl font-bold text-xs"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= LANDING PAGE ================= */
export default function Landing() {
  const featuredProducts = [
    { id: "feat1", title: "Signature Banana Chips", price: "90", image: chilliBana },
    { id: "feat2", title: "Natural Banana Powder", price: "90", image: bananaPowder },
    { id: "feat3", title: "Banana Length Pepper", price: "90", image: bananach5 },
  ];

  const bestSellers = [
    { id: "best1", title: "Ultra Thin Banana Chips", price: "90", image: chilliBana },
    { id: "best2", title: "Spicy Banana Chips", price: "90", image: bananaChilli },
    { id: "best3", title: "Classic Banana Chips", price: "90", image: bananaChips },
    { id: "best4", title: "Banana Salti Chips", price: "90", image: bananaSalti },
    { id: "best5", title: "Banana Powder", price: "90", image: bananaPowder },
  ];

  return (
    <div className="pt-24 font-sans">
      {/* ================= HERO ================= */}
      <section className="min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-red-900 to-red-700 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Khawo <span className="text-yellow-300">Jaldi</span>
              <br />
              Raho Swasth
            </h1>

            <p className="text-red-100 mb-8 text-base md:text-lg">
              Authentic banana snacks fried in pure coconut oil.
            </p>

            <button className="bg-white text-red-800 px-8 py-4 rounded-full font-bold hover:scale-105 transition">
              Shop Now
            </button>
          </motion.div>

          <motion.img
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            src={bhujiya}
            className="w-full max-w-xs md:max-w-md mx-auto"
          />
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black mb-10">
          Top Selling
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            Best Sellers
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 md:py-20 bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[Leaf, ShieldCheck, Truck, Zap].map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Icon className="mx-auto text-yellow-400 w-8 h-8" />
              <p className="font-bold mt-3 text-sm md:text-base">
                {["100% Natural", "Hygienic", "Fast Delivery", "Daily Fresh"][i]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
