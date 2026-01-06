import React from "react";
import { FaStar } from "react-icons/fa";
import bhujiya from "../assets/bhujiya.webp";
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";
import bananach5 from "../assets/banana/bananach5.jpeg";


const ProductCard = ({ title, price, image, tag }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col items-center text-center relative group">
    {tag && (
      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
        {tag}
      </span>
    )}
    <div className="w-40 h-40 mb-4 overflow-hidden  border-4 border-white shadow-inner bg-gray-50 flex items-center justify-center">
      {image ? (
        <div className="w-full h-44 md:h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="text-gray-300 text-xs">No Image</div>
      )}
    </div>
    <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2 min-h-[40px]">{title}</h3>
    <p className="text-brand-green font-bold text-lg mb-3">₹ {price}</p>
    <button className="bg-brand-green text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition w-full">
      Add to Cart
    </button>
  </div>
);

const CategoryCard = ({ title, image }) => (
  <div className="relative group overflow-hidden rounded-full w-48 h-48 md:w-64 md:h-64 mx-auto border-4 border-brand-green/20">
    <img src={image} alt={title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
      <span className="text-white font-bold text-lg uppercase tracking-wider">{title}</span>
    </div>
  </div>
);

export default function Landing() {
  const plumCakes = [
    { title: "Banana Chips-100g", price: "90", image: chilliBana, tag: "Best Seller" },
    { title: "Banana Powder-100g", price: "90", image: bananaPowder, tag: "New" },
    { title: "Banana Length Pepper-100g", price: "90", image: bananach5 },
  ];

  const bestSellers = [
    { title: "Ultra Thin Banana Chips - 100g", price: "90", image: chilliBana },
    { title: "Banana Chips Spicy - 100g", price: "90", image: bananaChilli },
    { title: "Banana Chips Crisps Thick - 100g", price: "90", image: bananaChips },
    { title: "Banana Salti Chips - 100g", price: "90", image: bananaSalti },
    { title: "Banana Powder - 100g", price: "90", image: bananaPowder },
   ];

  const categories = [
    { title: "Banana Chips", image: bananaChilli },
    { title: "bananaPowder", image: bananaPowder },
    { title: "Banana Length Pepper", image: bananach5 },
  ];

  return (
    <div className="font-sans pt-25">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between z-10 relative">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-xl md:text-2xl font-script text-yellow-400 mb-2">Tasty and Crunchy</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Khawo Jaldi <br/><span className="text-yellow-300">Raho Healthy</span></h1>
            <p className="text-red-100 mb-8 max-w-md">Experience the authentic taste of tradition with our rich, dry-fruit loaded plum cakes.</p>
            <button className="bg-white text-red-800 px-8 py-3 rounded-full font-bold hover:bg-yellow-100 transition shadow-lg">Shop Now</button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={bhujiya} alt="Plum Cake" className="rounded-xl shadow-2xl border-4 border-yellow-500/30 transform rotate-[-5deg] hover:rotate-0 transition duration-500" />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             {/* Snowflakes or patterns could go here */}
        </div>
      </section>

      {/* Plum Cake Collection */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                {/* <img src="https://placehold.co/100x100/transparent/png?text=Santa" alt="Santa" className="w-16 h-16 mx-auto mb-4 inline-block" /> */}
                <h2 className="text-3xl font-bold text-red-900">Our top selling products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plumCakes.map((cake, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-red-100 text-center">
                        <img src={cake.image} alt={cake.title} className="w-full h-68 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{cake.title}</h3>
                        <p className="text-red-600 font-bold text-xl">₹ {cake.price}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Feature Product - Banana Wafers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                 <img src={chilliBana} alt="Banana Wafers" className="rounded-full shadow-2xl border-8 border-yellow-100 w-full max-w-md mx-auto" />
            </div>
            <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Ultra Thin Banana</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Authentic Banana Chips, fried in pure oil for that traditional taste and crunch. 
                    Perfectly sliced, ultra-thin wafers that melt in your mouth.
                </p>
                <div className="flex gap-4 mb-8">
                    <span className="px-4 py-2 border rounded-full hover:bg-green-50 cursor-pointer border-green-600 text-green-700 font-bold">100g</span>
                    <span className="px-4 py-2 border rounded-full hover:bg-green-50 cursor-pointer border-gray-300 text-gray-600">200g</span>
                    <span className="px-4 py-2 border rounded-full hover:bg-green-50 cursor-pointer border-gray-300 text-gray-600">500g</span>
                </div>
                <div className="flex gap-4">
                    <button className="flex-1 bg-green-700 text-white py-3 rounded-full font-bold hover:bg-green-800 transition">Add to Cart</button>
                    <button className="flex-1 bg-red-700 text-white py-3 rounded-full font-bold hover:bg-red-800 transition">Buy Now</button>
                </div>
            </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-brand-green/5">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 flex items-center gap-2">
                    <span className="w-2 h-8 bg-brand-green rounded-full"></span>
                    Our Best Sellers
                </h2>
                <a href="#" className="text-green-700 font-semibold hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {bestSellers.map((product, i) => (
                    <ProductCard key={i} {...product} />
                ))}
            </div>
        </div>
      </section>


      {/* Featured Product - Aloo Tandoori */}
      <section className="py-16 bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
                <img src={bananach5} alt="Aloo Tandoori" className="w-full shadow-2xl rounded-lg transform -rotate-6" />
            </div>
            <div className="md:w-2/3">
                <h2 className="text-4xl font-bold mb-4 font-script">Banana Length Pepper</h2>
                <p className="text-red-100 mb-8 text-lg">Our signature Banana Length Pepper, expertly roasted and coated with a secret spice blend, offers a rich, bold, and irresistibly savory taste.</p>
                <button className="bg-white text-red-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">Buy Now</button>
            </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="py-16 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
             <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    <span className="text-3xl">🧺</span> Shop By Category
                </h2>
                <a href="#" className="text-green-200 hover:text-white">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {categories.map((cat, i) => (
                    <div key={i}>
                        <CategoryCard {...cat} />
                        <h3 className="mt-4 text-xl font-semibold">{cat.title}</h3>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Customer Feedback */}
      <section className="py-16 bg-brand-yellow">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-yellow-900 mb-12">Crunchy Customer Feedback</h2>
            <div className="bg-white p-8 rounded-2xl shadow-xl relative">
                <div className="text-yellow-400 flex justify-center gap-1 mb-4 text-xl">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p className="text-gray-600 text-lg italic mb-6">"The best banana chips I've ever had! The coconut oil flavor is authentic and they are perfectly crispy. Delivery was super fast too!"</p>
                <div className="font-bold text-gray-800">- Priya S., Bangalore</div>
            </div>
        </div>
      </section>

    </div>
  );
}
