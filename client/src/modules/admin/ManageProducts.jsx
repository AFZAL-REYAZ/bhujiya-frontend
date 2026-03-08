import React, { useEffect, useMemo, useState } from "react";
import API from "../../config/api/apiconfig";
import { Edit3, ImagePlus, Save, Trash2, X } from "lucide-react";

const CATEGORY_OPTIONS = ["Spicy Namkeen", "Halka Fulka Snacks", "Other"];

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const origin = apiBase.replace(/\/api\/?$/, "");
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${origin}${cleanPath}`;
};

export default function ManageProducts({ products = [], refreshProducts }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const sortedProducts = useMemo(() => {
    return [...(products || [])].sort((a, b) => {
      const aDate = new Date(a?.createdAt || 0).getTime();
      const bDate = new Date(b?.createdAt || 0).getTime();
      return bDate - aDate;
    });
  }, [products]);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: "", message: "" }), 2800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [status]);

  const startEditing = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      qty: String(product.qty ?? ""),
      description: product.description || "",
      category:
        product.category && ["Spicy Namkeen", "Halka Fulka Snacks"].includes(product.category)
          ? product.category
          : "Other",
      customCategory:
        product.category && ["Spicy Namkeen", "Halka Fulka Snacks"].includes(product.category)
          ? ""
          : product.category || "",
      imageFile: null,
    });
  };

  const cancelEditing = () => {
    setEditing(null);
    setForm(null);
  };

  const submitUpdate = async (id) => {
    if (!form) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("price", form.price);
      payload.append("qty", form.qty);
      payload.append("description", form.description);
      payload.append(
        "category",
        form.category === "Other" ? (form.customCategory || "Other").trim() : form.category
      );

      if (form.imageFile) {
        payload.append("image", form.imageFile);
      }

      await API.put(`/products/${id}`, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });

      await refreshProducts?.();
      setStatus({ type: "success", message: "Product updated successfully." });
      cancelEditing();
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Update failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      await refreshProducts?.();
      setStatus({ type: "success", message: "Product deleted." });
      if (editing === id) cancelEditing();
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Delete failed.",
      });
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="max-w-[1220px] mx-auto space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl px-4 py-4 sm:px-5 sm:py-5 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Product Manager</h2>
        <p className="text-sm text-slate-500 mt-1">
          Edit product image, name, price, quantity, category, description and save instantly.
        </p>
      </div>

      {status.message && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
            status.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400">
          Total Products: {sortedProducts.length}
        </div>

        <div className="divide-y divide-slate-100">
          {sortedProducts.map((product) => {
            const isEditing = editing === product._id;
            const productImage = getImageUrl(product.image);

            return (
              <div key={product._id} className="p-3 sm:p-4">
                {!isEditing ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                    <div className="lg:col-span-2">
                      <div className="h-28 w-full rounded-xl bg-slate-50 overflow-hidden border border-slate-100">
                        {productImage ? (
                          <img src={productImage} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[11px] text-slate-400 font-semibold">
                            No image
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-7 min-w-0">
                      <h3 className="text-base font-black text-slate-900 truncate">{product.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">Rs. {product.price}</span>
                        <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">Qty {product.qty}</span>
                        <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold">{product.category || "Spicy Namkeen"}</span>
                      </div>
                    </div>

                    <div className="lg:col-span-3 flex lg:justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(product)}
                        className="h-9 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProduct(product._id)}
                        disabled={deletingId === product._id}
                        className="h-9 px-3 rounded-xl border border-red-200 text-red-600 text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Trash2 size={13} /> {deletingId === product._id ? "Deleting" : "Delete"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4">
                    <div className="xl:col-span-3 space-y-2">
                      <div className="h-36 rounded-xl bg-white overflow-hidden border border-slate-200">
                        {form?.imageFile ? (
                          <img src={URL.createObjectURL(form.imageFile)} alt="preview" className="h-full w-full object-cover" />
                        ) : productImage ? (
                          <img src={productImage} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[11px] text-slate-400 font-semibold">
                            No image
                          </div>
                        )}
                      </div>
                      <label className="h-10 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold inline-flex items-center justify-center gap-2 cursor-pointer">
                        <ImagePlus size={14} /> Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setForm((prev) => ({ ...prev, imageFile: e.target.files?.[0] || null }))}
                        />
                      </label>
                    </div>

                    <div className="xl:col-span-9 grid md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
                        <input
                          value={form?.name || ""}
                          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                        <select
                          value={form?.category || "Spicy Namkeen"}
                          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                          className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                        >
                          {CATEGORY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {form?.category === "Other" && (
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">New Category</label>
                          <input
                            value={form?.customCategory || ""}
                            onChange={(e) => setForm((prev) => ({ ...prev, customCategory: e.target.value }))}
                            className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                            placeholder="e.g. Festival Specials"
                          />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price</label>
                        <input
                          type="number"
                          min="0"
                          value={form?.price || ""}
                          onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                          className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity</label>
                        <input
                          type="number"
                          min="0"
                          value={form?.qty || ""}
                          onChange={(e) => setForm((prev) => ({ ...prev, qty: e.target.value }))}
                          className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                        <textarea
                          rows={3}
                          value={form?.description || ""}
                          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold resize-none"
                        />
                      </div>

                      <div className="md:col-span-2 flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="h-10 px-4 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold inline-flex items-center gap-1.5"
                        >
                          <X size={13} /> Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => submitUpdate(product._id)}
                          disabled={saving}
                          className="h-10 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Save size={13} /> {saving ? "Saving" : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {sortedProducts.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500 font-semibold">
              No products found. Add products from Add New Snack page.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
