import React, { useEffect, useMemo, useState } from "react";
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
import API from "../../config/api/apiconfig";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard({ products, refreshProducts }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError("");
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      const { data } = await API.get("/admin/orders", {
        params: { limit: 120 },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrders(data.orders || []);
    } catch (error) {
      setOrdersError(error?.response?.data?.message || "Orders load failed. Check admin login/token.");
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderStats = useMemo(() => {
    const total = orders.length;
    const featured = orders.filter((o) => o.source === "featured").length;
    const b2b = orders.filter((o) => o.source === "b2b").length;
    const product = orders.filter((o) => o.source === "product").length;
    const bestseller = orders.filter((o) => o.source === "bestseller").length;
    return { total, featured, b2b, product, bestseller };
  }, [orders]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150?text=No+Image";

    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    const origin = API_BASE_URL.replace(/\/api\/?$/, "");
    return `${origin}${cleanPath}`;
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
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      await API.delete(`/products/${id}`, {
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

      {/* Orders & Quotes */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Orders & Quotes</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Source tracking (Featured vs B2B)
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition"
          >
            Refresh
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Orders", value: orderStats.total },
              { label: "Featured", value: orderStats.featured },
              { label: "B2B", value: orderStats.b2b },
              { label: "Product Page", value: orderStats.product },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-100 p-5 bg-slate-50/40"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {ordersLoading ? (
            <div className="py-16 text-center text-slate-400 font-bold">
              Loading orders...
            </div>
          ) : ordersError ? (
            <div className="py-10 px-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 font-bold text-center">
              {ordersError}
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-bold">
              No orders yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Source</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Customer</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Product</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Qty</th>
                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orders.map((order) => {
                    const consumer = order.consumer || {};
                    const consumerName = consumer.companyName
                      ? `${consumer.companyName} (${consumer.name || "Contact"})`
                      : consumer.name || "Unknown";
                    const productTitle =
                      order.product?.title || "Wholesale Enquiry";
                    const qty =
                      order.requestedQty ||
                      order.product?.quantity ||
                      "-";
                    return (
                      <tr key={order._id} className="hover:bg-slate-50/40 transition">
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            {order.sourceLabel || order.source || "other"}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-bold text-slate-900">{consumerName}</div>
                          <div className="text-xs text-slate-400">{consumer.phone || "-"}</div>
                          {consumer.email && (
                            <div className="text-xs text-slate-400">{consumer.email}</div>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-semibold text-slate-900">
                            {productTitle}
                          </div>
                          {order.message && (
                            <div className="text-xs text-slate-400 line-clamp-1">
                              {order.message}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-900">
                          {qty}
                        </td>
                        <td className="px-6 py-5 text-xs text-slate-500 font-semibold">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
