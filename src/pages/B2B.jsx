import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaTruck,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

import chilliBana from "../assets/banana/chilliBana.jpeg";
import potatoChips from "../assets/potato/Potato-Chips-1.webp";
import murukku from "../assets/potato/Murukku - Traditional.webp";
import mixture from "../assets/potato/Mixture-South Special.webp";
import tapiocaChips from "../assets/potato/Tapioca Chips - Kerala Style.webp";
import bananaWafers from "../assets/banana/Banana Wafers - Thin.webp";

/* ================= BULK PRODUCT CARD ================= */
const BulkProductCard = ({
  title,
  price,
  bulkPrice,
  minQuantity,
  image,
  description,
}) => {
  const [quantity] = useState(minQuantity);

  const unitPrice = quantity >= minQuantity ? bulkPrice : price;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200
                    shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover
                     group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-4 right-4 bg-emerald-700 text-white
                         text-[11px] font-bold px-3 py-1 rounded-full tracking-widest">
          BULK
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-gray-500">Price / Kg</p>
            <p className="text-xl font-bold text-emerald-700">
              ₹{unitPrice}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Min Order</p>
            <p className="font-semibold text-gray-800">
              {minQuantity} Kg
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSeZOL6yvrZndmCO1QJ0qJu0WxDzgcgXFsiw3hHTbocGXQH_xQ/viewform?usp=publish-editor",
              "_blank"
            )
          }
         className="w-full bg-emerald-700 hover:bg-emerald-800
                           text-white py-3 rounded-xl font-semibold
                           transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

/* ================= B2B PAGE ================= */
const B2B = () => {
  const bulkProducts = [
    {
      id: 1,
      title: "Banana Chips – Classic",
      price: 420,
      bulkPrice: 425,
      minQuantity: 10,
      description: "Crispy banana chips made from premium Kerala bananas",
      image: chilliBana,
    },
    {
      id: 2,
      title: "Potato Chips – Spicy",
      price: 450,
      bulkPrice: 420,
      minQuantity: 10,
      description: "Spicy potato chips with authentic Indian spices",
      image: potatoChips,
    },
    {
      id: 3,
      title: "Murukku – Traditional",
      price: 480,
      bulkPrice: 445,
      minQuantity: 15,
      description: "Traditional South Indian murukku snack",
      image: murukku,
    },
    {
      id: 4,
      title: "Mixture – South Special",
      price: 400,
      bulkPrice: 460,
      minQuantity: 10,
      description: "Authentic South Indian mixture snack",
      image: mixture,
    },
    {
      id: 5,
      title: "Banana Wafers – Thin",
      price: 440,
      bulkPrice: 410,
      minQuantity: 10,
      description: "Ultra-thin banana wafers, crispy and light",
      image: bananaWafers,
    },
    {
      id: 6,
      title: "Tapioca Chips – Kerala Style",
      price: 460,
      bulkPrice: 400,
      minQuantity: 10,
      description: "Traditional Kerala-style tapioca chips",
      image: tapiocaChips,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-600
                          text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            B2B Bulk Orders
          </h1>

          <p className="text-lg md:text-xl text-emerald-100
                        max-w-2xl mx-auto">
            Premium snacks at wholesale prices for retailers,
            distributors, and restaurants.
          </p>

          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {[
              {
                icon: <FaTruck />,
                title: "Fast Delivery",
                text: "Pan India logistics",
              },
              {
                icon: <FaShoppingCart />,
                title: "Bulk Discounts",
                text: "Wholesale pricing",
              },
              {
                icon: <FaPhone />,
                title: "Dedicated Support",
                text: "B2B sales team",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-white/15 p-5 rounded-full mb-4 text-3xl">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-emerald-100">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Bulk Products
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Order in bulk and unlock special wholesale pricing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {bulkProducts.map((product) => (
              <BulkProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">
              Need Custom Orders?
            </h2>
            <p className="text-gray-600 mt-3">
              Get custom pricing, packaging, and quantities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border shadow-sm">
              <h3 className="font-semibold text-lg flex items-center mb-3">
                <FaPhone className="mr-2 text-emerald-600" />
                Call Us
              </h3>
              <p className="text-xl font-bold text-emerald-700">
                +91 98765 43210
              </p>
            </div>

            <div className="p-8 rounded-2xl border shadow-sm">
              <h3 className="font-semibold text-lg flex items-center mb-3">
                <FaEnvelope className="mr-2 text-emerald-600" />
                Email Us
              </h3>
              <p className="font-semibold text-emerald-700">
                maakavitalaxmi@gmail.com
              </p>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl border shadow-sm">
              <h3 className="font-semibold text-lg flex items-center mb-4">
                <FaWhatsapp className="mr-2 text-emerald-500" />
                WhatsApp Business
              </h3>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-emerald-600
                           hover:bg-emerald-700 text-white
                           px-6 py-3 rounded-xl font-semibold transition"
              >
                <FaWhatsapp className="mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-emerald-700 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Place Your Bulk Order?
        </h2>
        <p className="text-emerald-100 mb-8">
          Trusted by retailers across India
        </p>
        <button
            onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSeZOL6yvrZndmCO1QJ0qJu0WxDzgcgXFsiw3hHTbocGXQH_xQ/viewform?usp=publish-editor",
              "_blank"
            )
          }
          className="inline-block bg-white text-emerald-700
                     px-10 py-4 rounded-xl font-semibold text-lg
                     hover:bg-gray-100 transition"
        >
          Start Bulk Ordering
        </button>
      </section>
    </div>
  );
};

export default B2B;
