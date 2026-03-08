import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={48} className="text-green-600" />
        </motion.div>

        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">ORDER PLACED!</h1>
        <p className="text-gray-500 mb-8 font-medium">Your snacks are being packed with love.</p>
        
        <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
          <p className="font-mono text-sm text-gray-800">{orderId}</p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate("/orders")}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-all"
          >
            Track Order <Package size={18} />
          </button>
          
          <button 
            onClick={() => navigate("/")}
            className="w-full bg-white text-black border-2 border-gray-100 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:border-black transition-all"
          >
            Continue Shopping <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}