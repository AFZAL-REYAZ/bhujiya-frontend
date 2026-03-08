import React from "react";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Award, Clock } from "lucide-react";

const HealthBenefits = () => {
  const benefits = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Natural",
      description: "No artificial colors, flavors, or preservatives",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Rich in Potassium",
      description: "Natural source of essential minerals",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fresh Daily",
      description: "Made fresh every day for maximum crispiness",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Heart Healthy",
      description: "Fried in coconut oil, good for heart health",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Healthy Snacking,
            <span className="text-green-600"> Happy Living</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our banana snacks are not just delicious, they're packed with health benefits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${benefit.bgColor} rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`${benefit.color} mb-6 inline-flex p-4 rounded-2xl bg-white`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <p className="text-green-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-green-100">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24h</div>
              <p className="text-green-100">Freshness Guarantee</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-green-100">Cities Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;
