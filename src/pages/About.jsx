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

      
    </section>
  );
}