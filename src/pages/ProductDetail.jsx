import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";

export default function ProductDetail() {
  const navigate = useNavigate();

  // ✅ fallback product (dummy data)
  const product = {
    title: "Banana Chips – Chilli Flavour (100 g)",
    price: 90,
    images: [
      chilliBana,
      bananaPowder,
      bananaChips,
      bananaSalti,
      bananaChilli
    ],
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleBuyNow = () => {
    navigate("/contactus");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT – Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-full h-[420px] bg-white flex items-center justify-center rounded-xl shadow-lg">
            <img
              src={selectedImage}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>


          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-lg cursor-pointer border-2 transition ${
                  selectedImage === img
                    ? "border-green-700"
                    : "border-gray-200"
                }`}
                alt="thumbnail"
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT – Details */}
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            <span className="ml-2 text-sm text-gray-500">
              (Trusted Quality)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-800">
              ₹ {product.price}
            </span>
            <span className="line-through text-gray-400">
              ₹ {(product.price * 1.2).toFixed(0)}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 text-sm rounded">
              20% OFF
            </span>
          </div>

          {/* Short Description */}
          <p className="text-gray-700">
            Crispy & crunchy banana chips made from premium raw bananas,
            hygienically processed for authentic taste and freshness.
          </p>

          {/* Quantity */}
          <div>
            <p className="font-medium">Quantity</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="border p-2 rounded"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border p-2 rounded"
              >
                <Plus size={16} />
              </button>
              <span className="text-green-600 text-sm ml-3">
                ● In Stock
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 border-2 border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50 transition">
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
            >
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* PRODUCT DESCRIPTION */}
      <motion.div
        className="mt-14 border-t pt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>

        <p className="text-gray-700 leading-relaxed">
          <strong>{product.title}</strong> is prepared using carefully
          selected raw bananas and traditional methods to ensure
          superior taste, crunch, and freshness in every bite.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">🌿 100% Fresh & Hygienic</h3>
            <p className="text-gray-600">
              Prepared under hygienic conditions using premium ingredients.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">🔥 Authentic Taste</h3>
            <p className="text-gray-600">
              Perfect spice balance with crispy texture.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">🕒 Anytime Snack</h3>
            <p className="text-gray-600">
              Ideal for tea-time, travel & daily munching.
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Specifications</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li><strong>Net Weight:</strong> 200 g</li>
            <li><strong>Price:</strong> ₹127</li>
            <li><strong>Shelf Life:</strong> 6 Months</li>
            <li><strong>Packaging:</strong> Plastic Packet</li>
            <li><strong>Country of Origin:</strong> India 🇮🇳</li>
            <li><strong>Quality:</strong> Best & Premium</li>
          </ul>
        </div>

        {/* Storage */}
        <div className="mt-8 bg-green-50 border rounded-lg p-4">
          <h3 className="font-bold mb-2">📦 Storage Instructions</h3>
          <p className="text-gray-700">
            Store in a cool & dry place. Keep the pack tightly sealed
            after opening to maintain freshness.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
