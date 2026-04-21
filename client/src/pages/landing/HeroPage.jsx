import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Truck, Users } from "lucide-react";
import { featuredProducts } from "./data";

const HeroPage = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pt-32 pb-12 bg-yellow-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
              <Leaf className="w-4 h-4" />
              Banana Food Products Manufacturer in Patna, Bihar | Wholesale Supplier Across India & World Wide
            </span>
            <h1 className="mt-4 text-xl sm:text-xl lg:text-4xl font-bold leading-tight text-white">
              Khawo Jaldi , <span className="text-lime-300">Raho Healthy</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-emerald-100 max-w-xl">
              Premium Banana Products Manufacturer In India Supplying Fresh, Crispy And Hygienic Banana Food Products For Wholesale, Distribution And Bulk Orders
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-emerald-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                FSSAI Certified Kitchen
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-200" />
                Pan-India Delivery
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-200" />
                10K+ Happy Customers
              </div>
            </div>
          </div>

          <div className="relative mt-4">
            <div className="relative overflow-hidden rounded-3xl h-[45vh] sm:h-[55vh] md:h-[65vh]">
              <motion.div
                animate={{ x: `-${heroIndex * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex h-full w-full"
              >
                {featuredProducts.map((product, i) => (
                  <div key={product.id} className="w-full flex-shrink-0 h-full">
                    <div className="relative w-full h-full flex items-center justify-center">

                      <motion.img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Product Info */}
                      <div className=" absolute bottom-6 text-white pb-4">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                          {product.title}
                        </h2>
                      </div>

                    </div>
                  </div>
                ))}
              </motion.div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${idx === heroIndex ? "w-6 bg-white" : "w-2 bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
