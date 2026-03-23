import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-2 sm:px-4 pt-20 sm:pt-28">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
        >
          <CheckCircle size={40} className="text-green-600" />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 tracking-tight">Order Confirmed!</h1>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base font-medium">Thank you for your purchase. Your order has been placed successfully and is being processed. You will receive a confirmation message soon.</p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100 flex flex-col items-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</span>
          <span className="font-mono text-base text-gray-800 break-all">{orderId}</span>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <button 
            onClick={() => navigate("/orders")}
            className="w-full bg-black text-white py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
          >
            Track Order <Package size={16} />
          </button>
          <button 
            onClick={() => navigate("/")}
            className="w-full bg-gray-50 text-black py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
          >
            Continue Shopping <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}