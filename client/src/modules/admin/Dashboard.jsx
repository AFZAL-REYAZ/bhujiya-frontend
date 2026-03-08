import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import API from "../../config/api/apiconfig";
import toast, { Toaster } from "react-hot-toast";

const formatOrderDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatOrderTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getOrderSource = (order) => (order?.source || "other").toLowerCase();
const getOrderSourceLabel = (order) =>
  order?.sourceLabel || order?.source || "Other";

const getOrderConsumer = (order) => {
  const consumer = order?.consumer || {};
  return {
    companyName:
      consumer.companyName || order?.company?.name || order?.companyName || "",
    contactName:
      consumer.name || order?.customer?.name || order?.contactName || "-",
    phone: consumer.phone || order?.phone || order?.customer?.phone || "-",
    email: consumer.email || order?.email || order?.customer?.email || "",
  };
};

const getOrderProductTitle = (order) =>
  order?.product?.title ||
  order?.product?.name ||
  order?.product?.productName ||
  "Wholesale Enquiry";

const getOrderQty = (order) =>
  order?.requestedQty || order?.quantity || order?.product?.quantity || "-";

const getCompactQty = (order) => {
  const raw = String(getOrderQty(order) ?? "-").trim();
  if (!raw) return "-";
  if (raw.length <= 9) return raw;
  return `${raw.slice(0, 8)}...`;
};

const SOURCE_STYLES = {
  featured: "bg-amber-50 text-amber-700 border-amber-200",
  b2b: "bg-emerald-50 text-emerald-700 border-emerald-200",
  product: "bg-indigo-50 text-indigo-700 border-indigo-200",
  other: "bg-slate-50 text-slate-600 border-slate-200",
};

const SOURCE_LABELS = {
  featured: "Featured",
  b2b: "B2B",
  product: "Product",
  other: "Other",
};

const SortIcon = ({ field, sortConfig }) => {
  if (sortConfig.key !== field)
    return <ChevronDown size={12} className="text-slate-300 ml-1 inline" />;
  return sortConfig.dir === "asc" ? (
    <ChevronUp size={12} className="text-slate-600 ml-1 inline" />
  ) : (
    <ChevronDown size={12} className="text-slate-600 ml-1 inline" />
  );
};

export default function Dashboard({ products, refreshProducts }) {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", dir: "desc" });
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError("");
      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("token");
      const { data } = await API.get("/admin/orders", {
        params: { limit: 500 },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrders(data.orders || []);
    } catch (error) {
      setOrdersError(
        error?.response?.data?.message || "Orders load failed."
      );
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderStats = useMemo(() => {
    const total = orders.length;
    const featured = orders.filter((o) => getOrderSource(o) === "featured").length;
    const b2b = orders.filter((o) => getOrderSource(o) === "b2b").length;
    const product = orders.filter((o) => getOrderSource(o) === "product").length;
    return { total, featured, b2b, product };
  }, [orders]);

  const filterOptions = [
    { key: "all", label: "All Orders", count: orderStats.total },
    { key: "featured", label: "Featured", count: orderStats.featured },
    { key: "b2b", label: "B2B", count: orderStats.b2b },
    { key: "product", label: "Product", count: orderStats.product },
  ];

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  const processedOrders = useMemo(() => {
    let list = [...orders];

    // Filter by source
    if (orderFilter !== "all") {
      list = list.filter((o) => getOrderSource(o) === orderFilter);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((o) => {
        const c = getOrderConsumer(o);
        return (
          c.companyName.toLowerCase().includes(q) ||
          c.contactName.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          getOrderProductTitle(o).toLowerCase().includes(q) ||
          (o._id || "").toLowerCase().includes(q)
        );
      });
    }

    // Sort
    list.sort((a, b) => {
      let aVal, bVal;
      const ca = getOrderConsumer(a);
      const cb = getOrderConsumer(b);

      switch (sortConfig.key) {
        case "createdAt":
          aVal = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          bVal = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          break;
        case "company":
          aVal = (ca.companyName || ca.contactName).toLowerCase();
          bVal = (cb.companyName || cb.contactName).toLowerCase();
          break;
        case "source":
          aVal = getOrderSource(a);
          bVal = getOrderSource(b);
          break;
        case "product":
          aVal = getOrderProductTitle(a).toLowerCase();
          bVal = getOrderProductTitle(b).toLowerCase();
          break;
        case "qty":
          aVal = Number(getOrderQty(a)) || 0;
          bVal = Number(getOrderQty(b)) || 0;
          break;
        default:
          aVal = 0;
          bVal = 0;
      }

      if (aVal < bVal) return sortConfig.dir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [orders, orderFilter, search, sortConfig]);

  const thClass =
    "px-3 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-wide border-b border-slate-100 cursor-pointer hover:text-slate-700 select-none whitespace-nowrap";

  return (
    <div className="w-full max-w-[1220px] mx-auto p-2 sm:p-3 lg:p-4 space-y-4">
      <Toaster position="bottom-center" />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm px-4 sm:px-5 py-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Orders & Enquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            All incoming orders from Featured, B2B, and Product pages
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={ordersLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition disabled:opacity-50"
        >
          <RefreshCw size={13} className={ordersLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stat Pills */}
      <div className="flex flex-wrap gap-2 bg-white rounded-2xl border border-slate-100 shadow-sm px-3 py-3 sm:px-4">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setOrderFilter(opt.key)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${
              orderFilter === opt.key
                ? "bg-slate-900 text-white border-slate-900 shadow"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {opt.label}
            <span
              className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] ${
                orderFilter === opt.key
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {opt.count}
            </span>
          </button>
        ))}

        {/* Search */}
        <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Filter
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 placeholder-slate-300 focus:outline-none focus:border-slate-400 bg-white w-full sm:w-52"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden w-full">
        {ordersLoading ? (
          <div className="py-20 text-center text-slate-400 text-sm font-semibold">
            <RefreshCw size={20} className="animate-spin mx-auto mb-3 text-slate-300" />
            Loading orders...
          </div>
        ) : ordersError ? (
          <div className="py-10 px-6 flex items-center gap-3 text-red-600 bg-red-50">
            <AlertTriangle size={18} />
            <span className="text-sm font-semibold">{ordersError}</span>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full table-fixed text-left border-separate border-spacing-0 text-sm">
              <thead className="bg-slate-50/70 sticky top-0 z-10">
                <tr>
                  <th className={thClass} style={{ width: "8%" }}>
                    #ID
                  </th>
                  <th
                    className={thClass}
                    onClick={() => handleSort("source")}
                    style={{ width: "11%" }}
                  >
                    Source
                    <SortIcon field="source" sortConfig={sortConfig} />
                  </th>
                  <th
                    className={thClass}
                    onClick={() => handleSort("company")}
                    style={{ width: "29%" }}
                  >
                    Customer
                    <SortIcon field="company" sortConfig={sortConfig} />
                  </th>
                  <th
                    className={thClass}
                    onClick={() => handleSort("product")}
                    style={{ width: "30%" }}
                  >
                    Product
                    <SortIcon field="product" sortConfig={sortConfig} />
                  </th>
                  <th
                    className={thClass}
                    onClick={() => handleSort("qty")}
                    style={{ width: "8%" }}
                  >
                    Qty
                    <SortIcon field="qty" sortConfig={sortConfig} />
                  </th>
                  <th
                    className={thClass}
                    onClick={() => handleSort("createdAt")}
                    style={{ width: "14%" }}
                  >
                    Date
                    <SortIcon field="createdAt" sortConfig={sortConfig} />
                  </th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {processedOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-16 text-center text-slate-400 text-sm font-medium"
                      >
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    processedOrders.map((order, idx) => {
                      const consumer = getOrderConsumer(order);
                      const sourceKey = getOrderSource(order);
                      const sourceLabel = getOrderSourceLabel(order);
                      const badgeClass =
                        SOURCE_STYLES[sourceKey] || SOURCE_STYLES.other;
                      const shortId = order?._id
                        ? order._id.slice(-6).toUpperCase()
                        : "-";

                      return (
                        <motion.tr
                          key={order._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors"
                        >
                          {/* ID */}
                          <td className="px-3 py-2.5 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                            #{shortId}
                          </td>

                          {/* Source */}
                          <td className="px-3 py-2.5 whitespace-nowrap align-top">
                            <span
                              className={`inline-block max-w-full px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wide border whitespace-nowrap overflow-hidden text-ellipsis ${badgeClass}`}
                              title={sourceLabel}
                            >
                              {SOURCE_LABELS[sourceKey] || sourceLabel}
                            </span>
                          </td>

                          {/* Customer */}
                          <td className="px-3 py-2.5 align-top">
                            <div className="font-semibold text-slate-900 text-xs leading-tight truncate">
                              {consumer.companyName || consumer.contactName}
                            </div>
                            {consumer.companyName && (
                              <div className="text-[10px] text-slate-400 leading-tight truncate mt-0.5">
                                {consumer.contactName}
                              </div>
                            )}
                            <div className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
                              {consumer.phone}{consumer.email ? ` | ${consumer.email}` : ""}
                            </div>
                          </td>

                          {/* Product */}
                          <td className="px-3 py-2.5 align-top">
                            <div className="text-xs font-semibold text-slate-800 leading-tight truncate">
                              {getOrderProductTitle(order)}
                            </div>
                            <div className="text-[10px] text-slate-400 leading-tight truncate mt-0.5">
                              {order.message || "-"}
                            </div>
                          </td>

                          {/* Qty */}
                          <td className="px-3 py-2.5 text-xs font-bold text-slate-900 text-center whitespace-nowrap align-top overflow-hidden">
                            <span className="inline-block max-w-[86px] truncate align-top" title={String(getOrderQty(order) ?? "-")}>
                              {getCompactQty(order)}
                            </span>
                          </td>

                          {/* Date & Time */}
                          <td className="px-3 py-2.5 whitespace-nowrap align-top">
                            <div className="text-xs font-semibold text-slate-700 leading-tight">
                              {formatOrderDate(order.createdAt)}
                            </div>
                            <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                              {formatOrderTime(order.createdAt)}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Footer count */}
        {!ordersLoading && !ordersError && processedOrders.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold">
              Showing{" "}
              <span className="text-slate-700 font-black">
                {processedOrders.length}
              </span>{" "}
              of{" "}
              <span className="text-slate-700 font-black">{orders.length}</span>{" "}
              orders
            </span>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold transition"
              >
                Clear search ✕
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}