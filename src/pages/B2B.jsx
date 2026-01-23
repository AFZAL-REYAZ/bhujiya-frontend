import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTruck, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import chilliBana from "../assets/banana/chilliBana.jpeg";
import potatoChips from "../assets/potato/Potato-Chips-1.webp"
import murukku from "../assets/potato/Murukku - Traditional.webp"
import mixture from "../assets/potato/Mixture-South Special.webp"
import tapiocaChips from "../assets/potato/Tapioca Chips - Kerala Style.webp"
import bananaWafers from "../assets/banana/Banana Wafers - Thin.webp" 

const BulkProductCard = ({ title, price, bulkPrice, minQuantity, image, description }) => {
  const [quantity, setQuantity] = useState(minQuantity);

  const calculateTotal = () => {
    return quantity >= minQuantity ? (bulkPrice * quantity).toFixed(2) : (price * quantity).toFixed(2);
  };

  const getUnitPrice = () => {
    return quantity >= minQuantity ? bulkPrice : price;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
          BULK PRICING
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Unit Price:</span>
            <div className="text-right">
              <span className="text-lg font-bold text-green-800">₹{getUnitPrice()}</span>
              {quantity >= minQuantity && (
                <span className="text-xs text-green-700 block">Bulk price applied!</span>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Min. Order:</span>
            <span className="text-sm font-semibold">{minQuantity} units</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
          <div className="flex items-center">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-l"
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-t border-b border-gray-300 py-1 bg-white text-gray-800"
              min="1"
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r"
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-800">₹{calculateTotal()}</span>
          </div>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
          <FaShoppingCart className="mr-2" />
          Add to Bulk Order
        </button>
      </div>
    </div>
  );
};

const B2B = () => {
  const bulkProducts = [
    {
      id: 1,
      title: "Banana Chips - Classic",
      price: 120,
      bulkPrice: 95,
      minQuantity: 50,
      description: "Crispy banana chips made from premium Kerala bananas",
      image: chilliBana
    },
    {
      id: 2,
      title: "Potato Chips - Spicy",
      price: 150,
      bulkPrice: 120,
      minQuantity: 100,
      description: "Spicy potato chips with authentic Indian spices",
      image: potatoChips
    },
    {
      id: 3,
      title: "Murukku - Traditional",
      price: 180,
      bulkPrice: 145,
      minQuantity: 75,
      description: "Traditional South Indian murukku snack",
      image: murukku
    },
    {
      id: 4,
      title: "Mixture - South Special",
      price: 200,
      bulkPrice: 160,
      minQuantity: 60,
      description: "Authentic South Indian mixture snack",
      image: mixture
    },
    {
      id: 5,
      title: "Banana Wafers - Thin",
      price: 140,
      bulkPrice: 110,
      minQuantity: 80,
      description: "Ultra-thin banana wafers, crispy and light",
      image: bananaWafers
    },
    {
      id: 6,
      title: "Tapioca Chips - Kerala Style",
      price: 160,
      bulkPrice: 130,
      minQuantity: 70,
      description: "Traditional Kerala-style tapioca chips",
      image: tapiocaChips
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">B2B Bulk Orders</h1>
          <p className="text-xl mb-8">Premium snacks at wholesale prices for retailers, restaurants, and distributors</p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="bg-white text-green-700 p-4 rounded-full mb-4">
                <FaTruck className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm opacity-90">Pan India delivery within 7-10 business days</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white text-green-700 p-4 rounded-full mb-4">
                <FaShoppingCart className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bulk Discounts</h3>
              <p className="text-sm opacity-90">Up to 25% discount on bulk orders</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white text-green-700 p-4 rounded-full mb-4">
                <FaPhone className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm opacity-90">Dedicated B2B support team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bulk Products</h2>
          <p className="text-gray-600 text-lg">Order in bulk and save more! Minimum quantities apply for wholesale pricing.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bulkProducts.map((product) => (
            <BulkProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Custom Orders?</h2>
            <p className="text-gray-600 text-lg">Contact our B2B team for custom quantities, packaging, and pricing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaPhone className="mr-2 text-green-700" />
                Call Us
              </h3>
              <p className="text-gray-600 mb-2">B2B Sales Team</p>
              <p className="text-2xl font-bold text-green-800 mb-4">+91 98765 43210</p>
              <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM IST</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaEnvelope className="mr-2 text-green-700" />
                Email Us
              </h3>
              <p className="text-gray-600 mb-2">For bulk inquiries</p>
              <p className="text-lg font-semibold text-green-800 mb-4">b2b@hotchips.com</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaWhatsapp className="mr-2 text-green-500" />
                WhatsApp Business
              </h3>
              <p className="text-gray-600 mb-4">Quick support and instant quotes</p>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <FaWhatsapp className="mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Place Your Bulk Order?</h2>
          <p className="text-xl mb-8">Join hundreds of satisfied B2B customers across India</p>
          <Link to="/contactus" className="inline-block bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Start Bulk Ordering
          </Link>
        </div>
      </div>
    </div>
  );
};

export default B2B;
