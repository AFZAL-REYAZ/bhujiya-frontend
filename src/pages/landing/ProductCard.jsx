import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../config/api/apiconfig";

const ProductCard = ({ product, onOpen }) => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (redirect = false) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/auth/sign-in");

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
      <div className="h-72 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 cursor-pointer"
          onClick={() => onOpen && onOpen(product)}
        >
          {product.title}
        </h3>

        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold text-gray-900">₹ {product.price}</p>
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

export default ProductCard;
