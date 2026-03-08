import React, { useState } from "react";
import ContactForm from "../ContactForm";
import HeroPage from "./HeroPage";
import FeaturedSection from "./FeaturedSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import BestSellersSection from "./BestSellersSection";
import TestimonialsSection from "./TestimonialsSection";
import QuoteModal from "./QuoteModal";
import { bestSellers, featuredProducts, getProductDetails } from "./data";

const LandingPage = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [quoteSource, setQuoteSource] = useState("featured");
  const [quoteSectionLabel, setQuoteSectionLabel] = useState("Featured Products");

  const handleOpenModal = (product, origin) => {
    const source = origin || "featured";
    const sectionLabelMap = {
      featured: "Featured Products",
      bestseller: "Best Sellers",
    };
    setSelectedProduct(product);
    setQuoteSource(source);
    setQuoteSectionLabel(sectionLabelMap[source] || "Featured Products");
    setShowQuoteModal(true);
  };

  return (
    <div className="font-sans overflow-hidden bg-[#f3f2ee]">
      <HeroPage />
      <FeaturedSection items={featuredProducts} onOpen={handleOpenModal} />
      <WhyChooseUsSection />
      <BestSellersSection items={bestSellers} onOpen={handleOpenModal} />
      <TestimonialsSection />
      <QuoteModal
        open={showQuoteModal}
        product={selectedProduct}
        source={quoteSource}
        sourceLabel={quoteSectionLabel}
        quoteForm={quoteForm}
        setQuoteForm={setQuoteForm}
        onClose={() => setShowQuoteModal(false)}
        getProductDetails={getProductDetails}
      />
      <ContactForm />
    </div>
  );
};

export default LandingPage;
