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
    weightValue: "100",
    weightUnit: "g",
    brand: "jaldichips",
    shelfLife: "4 Months",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    description: "",
    category: "Spicy Namkeen",
    customCategory: "",
    showOnPage: "home",
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
    data.append("qty", "0");
    data.append("description", formData.description);
    data.append("weight", `${formData.weightValue} ${formData.weightUnit}`);
    data.append("brand", formData.brand);
    data.append("shelfLife", formData.shelfLife);
    data.append("ingredients", formData.ingredients);
    data.append("showOnPage", formData.showOnPage);
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
        weightValue: "100",
        weightUnit: "g",
        brand: "jaldichips",
        shelfLife: "4 Months",
        ingredients: "G9 Banana + Rice Oil + flavour - salty",
        description: "",
        category: "Spicy Namkeen",
        customCategory: "",
        showOnPage: "home",
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
      className="max-w-[1120px] mx-auto pb-8"
    >
      <div className="mb-3 sm:mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Add New Snack</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">Inventory me naya product add karein with clean details.</p>
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4">
        <div className="xl:col-span-4 space-y-3">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="group relative h-52 sm:h-60 xl:h-[300px] w-full bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 transition-all"
          >
            {preview ? (
              <>
                <img src={preview} alt="preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaCloudUploadAlt className="text-white text-4xl" />
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                <FaCloudUploadAlt className="text-slate-300 text-4xl mx-auto mb-2" />
                <p className="text-slate-600 font-extrabold text-xs uppercase tracking-widest">Upload Product Image</p>
                <p className="text-[10px] text-slate-400 mt-1">PNG/JPG, recommended square image</p>
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

          <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Quick Tips</p>
            <ul className="mt-1.5 text-xs text-slate-500 space-y-1">
              <li>Use clear product name and exact price.</li>
              <li>Keep description short and benefit-focused.</li>
              <li>Upload clean front-facing product image.</li>
            </ul>
          </div>
        </div>

        <div className="xl:col-span-8 bg-white p-3 sm:p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3.5">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Snack Name</label>
              <input 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all" 
                placeholder="e.g. Peri Peri Banana Chips" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Price (Rs.)</label>
              <input 
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all" 
                placeholder="99" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {formData.category === "Other" ? (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">New Category Name</label>
                <input
                  required
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
                  placeholder="e.g. Festival Specials"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Category Preview</label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 h-[42px] flex items-center font-semibold">
                  {formData.category}
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Preview Summary</label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 h-[42px] flex items-center">
                {(formData.name || "New Product") + " | " + `${formData.weightValue || "100"} ${formData.weightUnit || "g"}`}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Show On Page</label>
              <select
                value={formData.showOnPage}
                onChange={(e) => setFormData({ ...formData, showOnPage: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
              >
                <option value="home">Home</option>
                <option value="b2b">B2B</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Packaging Size</label>
              <input
                required
                type="number"
                min="1"
                value={formData.weightValue}
                onChange={(e) => setFormData({ ...formData, weightValue: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
                placeholder="Enter value"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Unit</label>
              <select
                value={formData.weightUnit}
                onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
              >
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Brand</label>
              <input
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
                placeholder="e.g. jaldichips"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Shelf Life</label>
              <select
                required
                value={formData.shelfLife}
                onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm transition-all"
              >
                <option value="4 Months">4 Months</option>
                <option value="5 Months">5 Months</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Ingredients</label>
            <textarea
              required
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm h-20 resize-none transition-all"
              placeholder="e.g. G9 Banana + Rice Oil + flavour - salty"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1.5">Product Description</label>
            <textarea 
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none font-semibold text-sm h-24 resize-none transition-all" 
              placeholder="Tell the customers about the taste and ingredients..." 
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-black text-sm shadow-sm flex items-center justify-center gap-2.5 transition-all ${
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