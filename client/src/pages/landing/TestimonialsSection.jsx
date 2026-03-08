import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-[#f5ede0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Loved by foodies across the country.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Ravi Kumar",
              role: "Regular Customer",
              text: "The chips taste exactly like my grandmother used to make in Kerala. Perfect crispiness and authentic flavor!",
              rating: 5,
              image: "RK",
            },
            {
              name: "Anita Sharma",
              role: "Food Blogger",
              text: "Packaging is premium and the chips stay fresh for weeks. My go-to snack for family gatherings!",
              rating: 5,
              image: "AS",
            },
            {
              name: "Faiz Ahmed",
              role: "Chef & Food Critic",
              text: "As a chef, I appreciate the quality. Perfect balance of spices and the coconut oil makes all the difference.",
              rating: 5,
              image: "FA",
            },
          ].map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-md p-7"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                  {review.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-600">{review.role}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-gray-700 italic">"{review.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
