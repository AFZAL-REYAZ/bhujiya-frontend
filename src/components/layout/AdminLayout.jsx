import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaBox, 
  FaPlusCircle, 
  FaChartBar, 
  FaSignOutAlt, 
  FaHome,
  FaUserShield
} from "react-icons/fa";

const AdminLayout = ({ onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaBox />, label: "Inventory" },
    { path: "/admin/add-product", icon: <FaPlusCircle />, label: "Add Product" },
    { path: "/admin/analytics", icon: <FaChartBar />, label: "Reports" }, // Placeholder
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed h-full shadow-2xl z-20">
        {/* Logo Section */}
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-yellow-400/20 group-hover:rotate-12 transition-transform">
              KJ
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none text-white">Admin</h1>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Khawo Jaldi</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-yellow-400 text-slate-900 shadow-xl shadow-yellow-400/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          
          <div className="pt-6 mt-6 border-t border-slate-800">
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
              <FaHome className="text-xl" /> Back to Shop
            </button>
          </div>
        </nav>

        {/* Admin Profile & Logout */}
        <div className="p-6 mt-auto">
          <div className="bg-slate-800/50 p-4 rounded-3xl border border-slate-700/50 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
              <FaUserShield />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white truncate">Store Manager</p>
              <p className="text-[10px] text-slate-400 truncate">admin@khawojaldi.com</p>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 ml-72">
        {/* Top Header Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">System Online</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-400 uppercase tracking-tighter leading-none">Status</p>
              <p className="text-sm font-bold text-slate-800">Operational</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
              <FaBox />
            </div>
          </div>
        </header>

        {/* Page Content Rendered Here */}
        <main className="p-10">
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