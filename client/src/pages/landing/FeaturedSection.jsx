import React from "react";
import ProductCard from "./ProductCard";

const FeaturedSection = ({ items, onOpen }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Curated selection of our most loved banana snacks.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} origin="featured" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
