import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="mt-24 px-6 md:px-10">
      {/* Hero */}
      <div className="max-w-6xl mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#161616] via-[#121212] to-[#0f0f0f] ring-1 ring-amber-400/25 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold">About Us</h1>
        <p className="mt-2 text-sm md:text-base text-amber-100/80">
          Crafting refined menswear that blends heritage tailoring with modern presence.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Story */}
        <div className="rounded-2xl bg-white/90 backdrop-blur-md shadow-lg ring-1 ring-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Our Story</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            At Zafar Suits Designer, we celebrate timeless craftsmanship. From ceremonial sherwanis to contemporary Indo-Western pieces, every garment is designed with precision, premium fabrics, and attention to detail. Our mission is simple: help you look and feel exceptional on every occasion.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Based in Indore, we blend traditional techniques with modern silhouettes to deliver a unique and comfortable fit. Whether it's a wedding, festive celebration, or an elevated daily look, our team ensures your outfit reflects your style and confidence.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <MdCheckCircle className="text-amber-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Tailoring Excellence</div>
                <div className="text-gray-600 text-sm">Meticulous cuts, refined finishes, and comfort-first construction.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MdCheckCircle className="text-amber-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Premium Materials</div>
                <div className="text-gray-600 text-sm">Handpicked fabrics chosen for drape, durability, and feel.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MdCheckCircle className="text-amber-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Personalized Service</div>
                <div className="text-gray-600 text-sm">Style guidance, fitting support, and custom alterations.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MdCheckCircle className="text-amber-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Trusted Quality</div>
                <div className="text-gray-600 text-sm">Elevated pieces built to last through celebrations and beyond.</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/contactus" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black font-medium hover:bg-amber-300 transition">
              Book a fitting
            </Link>
          </div>
        </div>

        {/* Promise */}
        <div className="rounded-2xl bg-[#151515] ring-1 ring-amber-400/20 p-6 text-gray-200">
          <h3 className="text-lg font-serif font-semibold text-amber-200">Our Promise</h3>
          <p className="mt-2 text-gray-400">
            We’re committed to delivering garments that balance presence and comfort. Expect precise sizing, thoughtful details, and friendly guidance throughout your journey.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#161616] ring-1 ring-amber-400/20 p-4">
              <div className="text-sm uppercase tracking-wider text-amber-300">Fit</div>
              <div className="mt-1 text-gray-200">Tailored silhouettes with flexible adjustments.</div>
            </div>
            <div className="rounded-xl bg-[#161616] ring-1 ring-amber-400/20 p-4">
              <div className="text-sm uppercase tracking-wider text-amber-300">Fabric</div>
              <div className="mt-1 text-gray-200">Comfortable, durable, and elegant materials.</div>
            </div>
            <div className="rounded-xl bg-[#161616] ring-1 ring-amber-400/20 p-4">
              <div className="text-sm uppercase tracking-wider text-amber-300">Detail</div>
              <div className="mt-1 text-gray-200">Finishes that elevate the entire look.</div>
            </div>
            <div className="rounded-xl bg-[#161616] ring-1 ring-amber-400/20 p-4">
              <div className="text-sm uppercase tracking-wider text-amber-300">Service</div>
              <div className="mt-1 text-gray-200">Responsive support before and after purchase.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}