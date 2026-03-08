import React, { useEffect, useState } from "react";
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
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AdminLayout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaBoxOpen />, label: "Dashboard" },
    { path: "/admin/add-product", icon: <FaPlusCircle />, label: "Add Product" },
  ];

  const handleNavigateHome = () => {
    setIsMobileSidebarOpen(false);
    navigate("/");
  };

  const handleLogout = () => {
    setIsMobileSidebarOpen(false);
    onLogout?.();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidthClass = isDesktopSidebarCollapsed ? "lg:w-24" : "lg:w-72";
  const contentShiftClass = isDesktopSidebarCollapsed ? "lg:ml-24" : "lg:ml-72";
  const itemPaddingClass = isDesktopSidebarCollapsed
    ? "lg:px-0 lg:justify-center"
    : "lg:px-5";

  return (
    <div className="min-h-screen bg-slate-100 font-sans overflow-x-clip">
      <div
        className={`fixed inset-0 bg-slate-900/45 backdrop-blur-[1px] z-30 transition-opacity lg:hidden ${
          isMobileSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      <aside
        className={`w-72 ${sidebarWidthClass} bg-slate-900 text-white fixed inset-y-0 left-0 flex flex-col shadow-2xl z-40 transition-all duration-300 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 mb-1 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={handleNavigateHome}>
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-400/20 transition-transform group-hover:rotate-6">
                MK
              </div>
              <div className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>
                <h1 className="text-lg font-black tracking-tight leading-none text-white">Admin Console</h1>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  Maa Kavita Lakxmi
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
                title={isDesktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isDesktopSidebarCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
              </button>
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3.5 rounded-2xl text-sm font-extrabold tracking-wide transition-all duration-200 ${itemPaddingClass} ${
                  isActive
                    ? "bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>{item.label}</span>
            </NavLink>
          ))}

          <div className="pt-5 mt-5 border-t border-slate-800">
            <button
              onClick={handleNavigateHome}
              className={`w-full flex items-center gap-4 py-3.5 rounded-2xl text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all ${itemPaddingClass}`}
            >
              <FaHome className="text-lg" />
              <span className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>Back to Storefront</span>
            </button>
          </div>
        </nav>

        <div className="p-5 mt-auto border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <FaUserShield />
            </div>
            <div className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>
              <p className="text-xs font-black text-white">Admin Access</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Live Control Panel</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 ${
              isDesktopSidebarCollapsed ? "lg:px-0" : ""
            }`}
          >
            <FaSignOutAlt />
            <span className={`${isDesktopSidebarCollapsed ? "lg:hidden" : ""}`}>LOGOUT</span>
          </button>
        </div>
      </aside>

      <div className={`min-w-0 transition-all duration-300 ${contentShiftClass}`}>
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <FaBars />
            </button>
            <button
              type="button"
              className="hidden lg:flex h-10 w-10 rounded-xl border border-slate-200 items-center justify-center text-slate-700 hover:bg-slate-50"
              onClick={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
            >
              {isDesktopSidebarCollapsed ? <FaChevronRight size={13} /> : <FaChevronLeft size={13} />}
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

        <main className="px-3 py-4 sm:px-6 lg:px-10 overflow-x-hidden">
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