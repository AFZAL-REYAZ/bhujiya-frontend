import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaPlusCircle,
  FaSignOutAlt,
  FaHome,
  FaUserShield,
  FaBars,
  FaTimes,
  FaRegClock,
} from "react-icons/fa";

const AdminLayout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaBoxOpen />, label: "Dashboard" },
    { path: "/admin/add-product", icon: <FaPlusCircle />, label: "Add Product" },
  ];

  const handleNavigateHome = () => {
    setSidebarOpen(false);
    navigate("/");
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    onLogout?.();
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <div
        className={`fixed inset-0 bg-slate-900/45 z-30 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`w-72 bg-slate-900 text-white flex flex-col fixed h-full shadow-2xl z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-7 mb-2 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={handleNavigateHome}>
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-400/20 group-hover:rotate-6 transition-transform">
                MK
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight leading-none text-white">Admin Console</h1>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  Maa Kavita Lakxmi
                </span>
              </div>
            </div>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-extrabold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="pt-5 mt-5 border-t border-slate-800">
            <button
              onClick={handleNavigateHome}
              className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <FaHome className="text-lg" /> Back to Storefront
            </button>
          </div>
        </nav>

        <div className="p-5 mt-auto border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <FaUserShield />
            </div>
            <div>
              <p className="text-xs font-black text-white">Admin Access</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Live Control Panel</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-72">
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-5 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">System Online</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-400 uppercase tracking-tighter leading-none">Status</p>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FaRegClock className="text-slate-400" /> Operational
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
              <FaBoxOpen />
            </div>
          </div>
        </header>

        <main className="p-5 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;