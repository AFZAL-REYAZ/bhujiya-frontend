import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaPlus, FaCloudUploadAlt, FaTrash, FaCheckCircle } from "react-icons/fa";

export default function AddProduct({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    qty: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [toast, setToast] = useState({
  show: false,
  type: "",
  message: ""
});

  // Handle Image Change & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show instant preview
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

  const data = new FormData();
  data.append("name", formData.name);
  data.append("price", formData.price);
  data.append("qty", formData.qty);
  data.append("description", formData.description);
  if (image) data.append("image", image);

  try {
    await axios.post(`${API_BASE_URL}/products/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // SUCCESS TOAST
    setToast({
      show: true,
      type: "success",
      message: "Product added successfully!"
    });

    // Reset form
    setFormData({ name: "", price: "", qty: "", description: "" });
    setImage(null);
    setPreview(null);
    onAdd();

  } catch (error) {

    setToast({
      show: true,
      type: "error",
      message: error.response?.data?.message || "Failed to upload product"
    });

  } finally {
    setLoading(false);

    // auto hide toast
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  }
};


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto pb-20"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Add New Snack</h2>
          <p className="text-slate-500 font-medium">Inventory mein naya crunch shamil karein</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Left Side: Image Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="group relative h-80 w-full bg-slate-100 rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-green-500 transition-all"
          >
            {preview ? (
              <>
                <img src={preview} alt="preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaCloudUploadAlt className="text-white text-4xl" />
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <FaCloudUploadAlt className="text-slate-300 text-5xl mx-auto mb-4" />
                <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">Click to Upload Image</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          {preview && (
            <button 
              type="button"
              onClick={() => {setPreview(null); setImage(null)}}
              className="w-full py-3 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-50 rounded-2xl transition-all"
            >
              <FaTrash size={14}/> Remove Image
            </button>
          )}
        </div>

        {/* Right Side: Form Details */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Snack Name</label>
              <input 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-green-500 focus:bg-white outline-none font-bold transition-all" 
                placeholder="e.g. Peri Peri Banana Chips" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Price (₹)</label>
              <input 
                type="number" required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-green-500 focus:bg-white outline-none font-bold transition-all" 
                placeholder="99" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Stock Quantity</label>
            <input 
              type="number" required
              value={formData.qty}
              onChange={(e) => setFormData({...formData, qty: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-green-500 focus:bg-white outline-none font-bold transition-all" 
              placeholder="How many packets?" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Product Description</label>
            <textarea 
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-green-500 focus:bg-white outline-none font-bold h-32 resize-none transition-all" 
              placeholder="Tell the customers about the taste and ingredients..." 
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-xl flex items-center justify-center gap-4 transition-all ${loading ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {loading ? "Adding to Store..." : <><FaPlus /> Publish Product</>}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}