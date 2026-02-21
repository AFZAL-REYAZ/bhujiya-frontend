import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, Star, Plus, Minus } from "lucide-react";
import API from "../api/axios";

// Assets
import bananaChilli from "../assets/banana/bananaChilli.jpeg";
import bananaChips from "../assets/banana/bananaChips.jpeg";
import bananaPowder from "../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../assets/banana/bananaSalti.jpeg";
import chilliBana from "../assets/banana/chilliBana.jpeg";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: "p1",
      title: "Hot Chilli Banana Chips",
      subtitle: "Spicy & Crunchy",
      price: 90,
      mrp: 150,
      image: chilliBana,
      tag: "Best Seller",
      rating: 4.9,
      reviews: "2.1k",
      features: ["Farm Fresh", "No Preservatives", "Zero Trans Fat"],
      color: "rose",
      badgeColor: "bg-rose-600"
    },
    {
      id: "p2",
      title: "Classic Golden Chips",
      subtitle: "Traditional Taste",
      price: 90,
      mrp: 120,
      image: bananaChips,
      tag: "Traditional",
      rating: 4.8,
      reviews: "1.8k",
      features: ["100% Coconut Oil", "Sea Salted", "Hand-picked"],
      color: "amber",
      badgeColor: "bg-amber-600"
    },
    {
      id: "p3",
      title: "Pure Banana Powder",
      subtitle: "Nutrient Powerhouse",
      price: 90,
      mrp: 180,
      image: bananaPowder,
      tag: "Superfood",
      rating: 5.0,
      reviews: "950",
      features: ["Gluten Free", "Immunity Booster", "100% Natural"],
      color: "emerald",
      badgeColor: "bg-emerald-600"
    },
    {
      id: "p4",
      title: "Himalayan Salted Delite",
      subtitle: "Extra Crispy",
      price: 90,
      mrp: 130,
      image: bananaSalti,
      tag: "Gourmet",
      rating: 4.7,
      reviews: "1.1k",
      features: ["Light & Airy", "Low Sodium", "Himalayan Salt"],
      color: "sky",
      badgeColor: "bg-sky-600"
    },
    {
      id: "p5",
      title: "Peri Peri Spiced Chips",
      subtitle: "Global Fusion",
      price: 90,
      mrp: 160,
      image: bananaChilli,
      tag: "New Arrival",
      rating: 4.9,
      reviews: "560",
      features: ["Zesty Flavor", "Global Fusion", "Limited"],
      color: "orange",
      badgeColor: "bg-orange-600"
    }
  ];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = async (product, redirectToCart = false) => {
    const token = localStorage.getItem("token");
    if (!token) { 
      navigate("/auth"); 
      return; 
    }
    
    setLoadingId(product.id);
    try {
      await API.post("/cart/add", {
        productId: product.id, 
        name: product.title,
        price: product.price, 
        image: product.image, 
        quantity: quantity
      }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (redirectToCart) {
        navigate('/cart');
      } else {
        alert(`Added to cart!`);
      }
    } catch { 
      alert("Error!"); 
    } finally { 
      setLoadingId(null); 
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-700">
            Showing {filteredProducts.length} products
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products"
            className="w-40 sm:w-60 px-3 py-2 text-sm rounded-full border border-[#D8C7AA] bg-[#FBF6EC] focus:outline-none focus:ring-2 focus:ring-[#184328]/40"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#E2D5C0] shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 shadow-sm hover:shadow-md transition"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites[product.id]
                        ? "fill-rose-500 text-rose-500"
                        : "text-gray-400 hover:text-rose-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-sm font-semibold text-gray-900 leading-snug">
                  {product.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {product.subtitle}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.mrp}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-full text-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-full text-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAction(product, false)}
                  disabled={loadingId === product.id}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#0b3b2a] text-white text-xs font-medium py-2.5 hover:bg-[#12321E] transition disabled:opacity-60"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
