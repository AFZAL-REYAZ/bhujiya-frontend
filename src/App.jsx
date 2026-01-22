import React, { useState } from 'react'

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
import WhatsAppChat from './components/WhatsAppChat';
import ScrollToTop from './components/ScrollToTop';




const App = () => {
   
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route  path="/" element={<Landing />}/>
        <Route  path="/ProductDetail" element={<ProductDetail />}/>
        <Route  path="/contactus" element={<ContactUs />}/>
        <Route  path="/about" element={<About />}/>
        <Route  path="/terms" element={<Terms />}/>
        <Route  path="/privacy" element={<Privacy />}/>
        <Route  path="/b2b" element={<B2B />}/>
      </Routes>
      <Footer/>
      <WhatsAppChat/>
    </BrowserRouter>
  )
}

export default App