import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  Package, 
  IndianRupee, 
  Layers, 
  AlertTriangle, 
  Info,
  ShoppingCart
} from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard({ products, refreshProducts }) {
  // Backend URL define karna zaroori hai
  const API_BASE_URL = "http://localhost:5000";

  // Sabse powerful helper function path sahi karne ke liye
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150?text=No+Image";
    
    // Agar path pehle se '/' se shuru hota hai toh theek, nahi toh '/' lagao
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    
    // Final result: http://localhost:5000/uploads/image.jpg
    return `${API_BASE_URL}${cleanPath}`;
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle size={18} />
          <span className="font-bold">Permanent Delete?</span>
        </div>
        <p className="text-xs text-slate-500">This action cannot be undone, Bhai.</p>
        <div className="flex gap-2 mt-1">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await executeDelete(id);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 6000, style: { borderRadius: '20px', padding: '16px' } });
  };

  const executeDelete = async (id) => {
    const loadingToast = toast.loading("Sanitizing inventory...");
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Product removed!", { id: loadingToast });
      refreshProducts();
    } catch (error) {
      toast.error("Delete failed. Check connection.", { id: loadingToast });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="max-w-[1400px] mx-auto space-y-10 p-6"
    >
      <Toaster position="bottom-center" />

      {/* Stats Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2">
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
            Kitchen <span className="text-slate-300">Stock.</span>
          </h2>
          <p className="text-slate-400 font-medium flex items-center gap-2 text-lg">
            <ShoppingCart size={20} className="text-orange-500" /> Manage your snacks and inventory
          </p>
        </div>
        
        <div className="bg-white p-2 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-between px-8 py-6">
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Inventory</span>
            <span className="text-4xl font-black text-slate-900">{products.length}</span>
          </div>
          <div className="bg-orange-500 p-4 rounded-3xl text-white shadow-lg shadow-orange-200">
            <Layers size={24} />
          </div>
        </div>
      </div>

      {/* Modern Inventory Table */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Snack Profile</th>
                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Pricing</th>
                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">In-Stock Status</th>
                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode='popLayout'>
                {products.map((p, idx) => (
                  <motion.tr 
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group hover:bg-slate-50/50 transition-all duration-300"
                  >
                    {/* Image & Name Cell */}
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-7">
                        <div className="relative h-24 w-24 shrink-0">
                          <div className="h-full w-full rounded-[2rem] overflow-hidden bg-slate-100 border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                            <img 
                              // Yahan helper function use ho raha hai jo port 5000 force karega
                              src={getImageUrl(p.image)} 
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                console.log("Frontend URL attempt:", e.target.src);
                                e.target.src = "https://via.placeholder.com/150?text=Path+Error";
                              }}
                            />
                          </div>
                          {p.qty < 5 && p.qty > 0 && (
                            <div className="absolute -top-2 -right-2 bg-orange-500 text-white p-1.5 rounded-full animate-pulse shadow-lg">
                              <Info size={12} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{p.name}</span>
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider italic">{p.description?.substring(0, 30)}...</span>
                        </div>
                      </div>
                    </td>

                    {/* Pricing Cell */}
                    <td className="px-10 py-7">
                      <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-5 py-2.5 rounded-2xl shadow-xl shadow-slate-200 font-black">
                        <IndianRupee size={14} className="text-slate-400" />
                        {p.price}
                      </div>
                    </td>

                    {/* Availability Cell */}
                    <td className="px-10 py-7">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end px-1">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${p.qty > 0 ? 'text-slate-400' : 'text-red-500'}`}>
                              {p.qty > 0 ? `${p.qty} Available` : 'Out of Stock'}
                           </span>
                        </div>
                        <div className="w-44 h-3 bg-slate-100 rounded-full overflow-hidden p-[2px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((p.qty / 100) * 100, 100)}%` }}
                            className={`h-full rounded-full ${p.qty > 20 ? 'bg-green-500' : p.qty > 0 ? 'bg-orange-500' : 'bg-red-500'}`}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions Cell */}
                    <td className="px-10 py-7 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={() => handleDelete(p._id)}
                          className="group/btn h-14 w-14 flex items-center justify-center bg-red-50 text-red-500 rounded-3xl hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <Trash2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-6">
            <div className="h-32 w-32 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200">
               <Package size={60} />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">Your kitchen is empty</h3>
              <p className="text-slate-400 font-medium">Add products to see them here.</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}