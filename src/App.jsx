import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import ProductDetail from './pages/ProductDetail';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import B2B from './pages/B2B';
import Auth from './pages/Auth'; 
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess'; 
import Orders from './pages/Orders'; 
import WhatsAppChat from './components/WhatsAppChat';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <div className="min-h-[70vh]"> 
        <Routes>
          <Route path="/" element={<Landing />}/>
          
          {/* 1. This handles clicks from the Header (Shop) */}
          <Route path="/ProductDetail" element={<ProductDetail />}/>
          
          {/* 2. This handles clicks from Orders/Landing items (Dynamic) */}
          <Route path="/product/:id" element={<ProductDetail />}/>
          
          <Route path="/contactus" element={<ContactUs />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/terms" element={<Terms />}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="/b2b" element={<B2B />}/>
          <Route path="/auth" element={<Auth />}/> 
          <Route path="/cart" element={<Cart />}/> 
          <Route path="/order-success" element={<OrderSuccess />}/> 
          <Route path="/orders" element={<Orders />}/> 
          
          <Route path="*" element={<div className="pt-40 text-center font-bold uppercase tracking-widest text-red-600">404 - Page Not Found</div>} />
        </Routes>
      </div>
      <Footer/>
      <WhatsAppChat/>
    </BrowserRouter>
  )
}

export default App