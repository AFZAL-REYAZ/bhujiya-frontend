import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../config/api/apiconfig";

const ProductCard = ({ product, onOpen, origin }) => {
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.stopPropagation();
    // Bypassing login, sending the product directly to Cart view via state
    navigate("/cart", { state: { directProduct: product } });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
      onClick={() => onOpen && onOpen(product, origin)}
    >
      <div className="h-72 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 cursor-pointer"
          onClick={() => onOpen && onOpen(product, origin)}
        >
          {product.title}
        </h3>

        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold text-gray-900">₹ {product.price}</p>
          <span className="text-xs font-bold text-gray-800">{product.quantity}</span>
        </div>

        <button
          onClick={handleBuyNow}
          className="mt-2 w-full inline-flex items-center justify-center bg-[#0b3b2a] text-white text-sm font-semibold py-2.5 rounded-full hover:bg-green-800 transition-colors"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy Now
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
