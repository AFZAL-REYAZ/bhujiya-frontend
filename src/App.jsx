import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import API from './api/axios'; // Use your custom axios instance

// Base Components
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppChat from './components/WhatsAppChat'
import ScrollToTop from './components/ScrollToTop'

// Customer Pages
import Landing from './pages/Landing'
import ProductDetail from './pages/ProductDetail'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import B2B from './pages/B2B'
import Auth from './pages/Auth'
import Cart from './pages/Cart'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'

// Admin Pages
import AdminLayout from './components/layout/AdminLayout'
import AdminLogin from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import AddProduct from './pages/Admin/AddProduct'

const App = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  // Fetch products for both Admin and Customer view
  const fetchProducts = async () => {
    try {
      // Use API instead of axios directly if you have an interceptor
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (error) {
      console.error("Products load fail:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Admin Logout Logic
  const handleAdminLogout = () => {
    localStorage.removeItem('token'); // Clear admin token too
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Routes>
        {/* ================= ADMIN SECTION (No Header/Footer) ================= */}
        {/* Admin Login Route */}
        <Route 
          path="/admin/login" 
          element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => setIsAdmin(true)} />} 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminLayout onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />}
        >
          {/* Default admin path leads to dashboard */}
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard products={products} refreshProducts={fetchProducts} />} />
          <Route path="add-product" element={<AddProduct onAdd={fetchProducts} />} />
        </Route>

        {/* ================= CUSTOMER SECTION (With Header/Footer) ================= */}
        <Route path="/*" element={
          <>
            <Header />
            <div className="min-h-[75vh]">
              <Routes>
                <Route path="/" element={<Landing products={products} />} />
                
                {/* Dynamic Product Routes */}
                <Route path="/ProductDetail" element={<ProductDetail />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* Information Pages */}
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/b2b" element={<B2B />} />
                
                {/* User Operations */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/orders" element={<Orders />} />
                
                {/* 404 Catch-all */}
                <Route path="*" element={
                  <div className="pt-40 pb-20 text-center">
                    <h1 className="text-6xl font-black text-gray-200">404</h1>
                    <p className="text-red-500 font-bold uppercase tracking-widest mt-2">Page Not Found</p>
                  </div>
                } />
              </Routes>
            </div>
            <Footer />
            <WhatsAppChat />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;