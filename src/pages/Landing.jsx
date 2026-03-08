import React, { useState } from "react";
import ContactForm from "../components/layout/ContactForm";
import HeroSection from "./landing/HeroSection";
import FeaturedSection from "./landing/FeaturedSection";
import WhyChooseUsSection from "./landing/WhyChooseUsSection";
import BestSellersSection from "./landing/BestSellersSection";
import TestimonialsSection from "./landing/TestimonialsSection";
import QuoteModal from "./landing/QuoteModal";
import { bestSellers, featuredProducts, getProductDetails } from "./landing/data";

export default function Landing() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ name: "", mobile: "", email: "", message: "" });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowQuoteModal(true);
  };

  return (
    <div className="font-sans overflow-hidden bg-[#f3f2ee]">
      <HeroSection />
      <FeaturedSection items={featuredProducts} onOpen={handleOpenModal} />
      <WhyChooseUsSection />
      <BestSellersSection items={bestSellers} onOpen={handleOpenModal} />
      <TestimonialsSection />
      <QuoteModal
        open={showQuoteModal}
        product={selectedProduct}
        quoteForm={quoteForm}
        setQuoteForm={setQuoteForm}
        onClose={() => setShowQuoteModal(false)}
        getProductDetails={getProductDetails}
      />
      <ContactForm />
    </div>
  );
}
