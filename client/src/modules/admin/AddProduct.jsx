import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPlus, FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const CATEGORY_OPTIONS = [
  "Spicy Namkeen",
  "Halka Fulka Snacks",
  "Other",
];

export default function AddProduct({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    qty: "",
    description: "",
    category: "Spicy Namkeen",
    customCategory: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
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
    const finalCategory =
      formData.category === "Other"
        ? (formData.customCategory || "Other").trim()
        : formData.category;
    data.append("category", finalCategory);
    if (image) data.append("image", image);

    try {
      await axios.post(`${API_BASE_URL}/products/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setToast({
        show: true,
        type: "success",
        message: "Product added successfully!",
      });

      setFormData({
        name: "",
        price: "",
        qty: "",
        description: "",
        category: "Spicy Namkeen",
        customCategory: "",
      });
      setImage(null);
      setPreview(null);
      onAdd?.();
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Failed to upload product",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToast({ show: false, type: "", message: "" });
      }, 2800);
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1150px] mx-auto pb-16"
    >
      <div className="mb-5 sm:mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Add New Snack</h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">Inventory me naya product add karein with clean details.</p>
        </div>
      </div>

      {toast.show && (
        <div
          className={`mb-4 rounded-xl border px-4 py-3 text-sm font-semibold ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5">
        <div className="xl:col-span-4 space-y-4">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="group relative h-64 sm:h-72 xl:h-[360px] w-full bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 transition-all"
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
                <FaCloudUploadAlt className="text-slate-300 text-5xl mx-auto mb-3" />
                <p className="text-slate-600 font-extrabold text-xs uppercase tracking-widest">Upload Product Image</p>
                <p className="text-[11px] text-slate-400 mt-2">PNG/JPG, recommended square image</p>
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
              onClick={() => {
                setPreview(null);
                setImage(null);
              }}
              className="w-full py-2.5 text-red-500 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 rounded-xl transition-all"
            >
              <FaTrash size={14} /> Remove Image
            </button>
          )}

          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Quick Tips</p>
            <ul className="mt-2 text-xs text-slate-500 space-y-1.5">
              <li>Use clear product name and exact price.</li>
              <li>Keep description short and benefit-focused.</li>
              <li>Upload clean front-facing product image.</li>
            </ul>
          </div>
        </div>

        <div className="xl:col-span-8 bg-white p-4 sm:p-6 lg:p-7 rounded-3xl shadow-sm border border-slate-100 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Snack Name</label>
              <input 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all" 
                placeholder="e.g. Peri Peri Banana Chips" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Price (Rs.)</label>
              <input 
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all" 
                placeholder="99" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {formData.category === "Other" ? (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">New Category Name</label>
                <input
                  required
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
                  placeholder="e.g. Festival Specials"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Category Preview</label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 h-[46px] flex items-center font-semibold">
                  {formData.category}
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Stock Quantity</label>
              <input 
                type="number"
                min="0"
                required
                value={formData.qty}
                onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all" 
                placeholder="How many packets?" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Preview Summary</label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 h-[46px] flex items-center">
                {(formData.name || "New Product") + " | Qty: " + (formData.qty || "0")}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Product Description</label>
            <textarea 
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm h-32 resize-none transition-all" 
              placeholder="Tell the customers about the taste and ingredients..." 
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-black text-sm sm:text-base shadow-sm flex items-center justify-center gap-3 transition-all ${
              loading ? "bg-slate-300 text-slate-100" : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {loading ? "Adding to Store..." : <><FaPlus /> Publish Product</>}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}