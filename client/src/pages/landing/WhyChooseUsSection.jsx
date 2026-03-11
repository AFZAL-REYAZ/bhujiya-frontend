import React from "react";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Truck } from "lucide-react";

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-[#f5ede0]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Why Choose Us
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-10">
          Premium Banana Chips Manufacturer in Patna – Fresh, Crispy and Authentic Taste
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <Leaf className="w-8 h-8" />,
              title: "100% Homemade",
              desc: "Freshly Made in Small Batches Using Traditional Recipes for Authentic Taste.",
            },
            {
              icon: <ShieldCheck className="w-8 h-8" />,
              title: "No Artificial Preservatives",
              desc: "Our Banana Chips In Patna Are Made With Natural Ingredients, Free From Artificial Colors, Flavors, And Preservatives For Pure Taste And Healthy Snacking.",
            },
            {
              icon: <Truck className="w-8 h-8" />,
              title: "Direct From Kitchen",
              desc: "Freshly Prepared Banana Chips Delivered Directly From Our Kitchen In Patna, Bihar For Authentic Taste And Quality.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-md px-6 py-8 flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#0b3b2a]">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
