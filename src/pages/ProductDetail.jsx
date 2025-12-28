import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Minus, Plus, Share2, Star, ChevronDown, ChevronUp, Ruler } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [showSizeChart, setShowSizeChart] = useState(false);

  // ✅ track which image is selected
  const [selectedImage, setSelectedImage] = useState(
    product?.images ? product.images[0] : product?.image
  );

  if (!product) {
    return (
      <div className="p-10 text-center">
        <p>Product not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 border rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition"
        >
          Go back
        </button>
      </div>
    );
  }

  const sizes = ["S", "S2", "M", "M2", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

  const handlepayment = () => {
    navigate("/contactus");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image + Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Image */}
          <div className="relative">
            <img
              src={selectedImage}
              alt={product.title}
              className="rounded-lg shadow-md w-full object-cover"
            />
            {product.sale && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md font-medium">
                SALE
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images.map((img, i) => (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-amber-700"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Product Details */}
        <motion.div 
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm font-medium">
                Premium
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-amber-500 mt-2 ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} fill={i < 4 ? "currentColor" : "none"} size={18} />
                ))}
              <span className="ml-2 text-sm text-gray-500">(24 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 ">
            <span className="line-through text-gray-400 text-lg">
              Rs. {product.oldPrice || (product.price * 1.2).toFixed(0)}
            </span>
            <span className="text-2xl font-semibold text-gray-900">
              Rs. {product.price}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-md font-medium">
              20% OFF
            </span>
          </div>
          
          <p className="text-gray-600">
            Premium quality fabric with perfect fitting. Handcrafted by expert tailors.
          </p>

          {/* Size Chart Button */}
          <div className="mt-2">
            <button 
              onClick={() => setShowSizeChart(!showSizeChart)}
              className="flex items-center text-amber-700 font-medium hover:text-amber-800 transition-colors"
            >
              <Ruler size={18} className="mr-2" />
              Size Chart
              {showSizeChart ? <ChevronUp size={18} className="ml-1" /> : <ChevronDown size={18} className="ml-1" />}
            </button>
            
            {/* Size Chart Modal */}
            {showSizeChart && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4 border rounded-lg overflow-hidden"
              >
                <div className="bg-amber-800 text-white py-3 px-4 font-bold text-center text-lg">
                  ZAFAR SUITS DESIGNER
                  <div className="text-sm font-normal">Men's Jacket Size Chart</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-black">
                      <tr>
                        <th className="py-3 px-4 text-left border">Size</th>
                        <th className="py-3 px-4 text-left border">Shoulder (in)</th>
                        <th className="py-3 px-4 text-left border">Chest (in)</th>
                        <th className="py-3 px-4 text-left border">Tummy (in)</th>
                        <th className="py-3 px-4 text-left border">Hip (in)</th>
                        <th className="py-3 px-4 text-left border">Sleeve Length</th>
                        <th className="py-3 px-4 text-left border">Jacket Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">S</td>
                        <td className="py-2 px-4 border">16.5</td>
                        <td className="py-2 px-4 border">32</td>
                        <td className="py-2 px-4 border">28</td>
                        <td className="py-2 px-4 border">34</td>
                        <td className="py-2 px-4 border">23.25</td>
                        <td className="py-2 px-4 border">27.5</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">S2</td>
                        <td className="py-2 px-4 border">17</td>
                        <td className="py-2 px-4 border">34</td>
                        <td className="py-2 px-4 border">30</td>
                        <td className="py-2 px-4 border">36</td>
                        <td className="py-2 px-4 border">23.5</td>
                        <td className="py-2 px-4 border">28</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">M</td>
                        <td className="py-2 px-4 border">17.5</td>
                        <td className="py-2 px-4 border">36</td>
                        <td className="py-2 px-4 border">32</td>
                        <td className="py-2 px-4 border">38</td>
                        <td className="py-2 px-4 border">24</td>
                        <td className="py-2 px-4 border">28.5</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">M2</td>
                        <td className="py-2 px-4 border">18</td>
                        <td className="py-2 px-4 border">38</td>
                        <td className="py-2 px-4 border">34</td>
                        <td className="py-2 px-4 border">40</td>
                        <td className="py-2 px-4 border">24.5</td>
                        <td className="py-2 px-4 border">29</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">L</td>
                        <td className="py-2 px-4 border">18.5</td>
                        <td className="py-2 px-4 border">40</td>
                        <td className="py-2 px-4 border">36</td>
                        <td className="py-2 px-4 border">42</td>
                        <td className="py-2 px-4 border">25</td>
                        <td className="py-2 px-4 border">29.5</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">XL</td>
                        <td className="py-2 px-4 border">19</td>
                        <td className="py-2 px-4 border">42</td>
                        <td className="py-2 px-4 border">38</td>
                        <td className="py-2 px-4 border">44</td>
                        <td className="py-2 px-4 border">25.5</td>
                        <td className="py-2 px-4 border">30</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">XXL</td>
                        <td className="py-2 px-4 border">19.25</td>
                        <td className="py-2 px-4 border">44</td>
                        <td className="py-2 px-4 border">40</td>
                        <td className="py-2 px-4 border">45</td>
                        <td className="py-2 px-4 border">26</td>
                        <td className="py-2 px-4 border">30.5</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">3XL</td>
                        <td className="py-2 px-4 border">19.5</td>
                        <td className="py-2 px-4 border">46</td>
                        <td className="py-2 px-4 border">42</td>
                        <td className="py-2 px-4 border">46</td>
                        <td className="py-2 px-4 border">26</td>
                        <td className="py-2 px-4 border">30.5</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">4XL</td>
                        <td className="py-2 px-4 border">19.5</td>
                        <td className="py-2 px-4 border">48</td>
                        <td className="py-2 px-4 border">45</td>
                        <td className="py-2 px-4 border">48</td>
                        <td className="py-2 px-4 border">26.25</td>
                        <td className="py-2 px-4 border">31</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-black">
                        <td className="py-2 px-4 border font-medium">5XL</td>
                        <td className="py-2 px-4 border">20</td>
                        <td className="py-2 px-4 border">50</td>
                        <td className="py-2 px-4 border">46</td>
                        <td className="py-2 px-4 border">50</td>
                        <td className="py-2 px-4 border">26.5</td>
                        <td className="py-2 px-4 border">31.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sizes */}
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-900">Select Size</p>
              <span className="text-sm text-gray-500">Size Guide: {size}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-md border-2 transition-all ${
                    size === s
                      ? "bg-amber-800 text-white border-amber-800"
                      : "border-gray-300 text-gray-700 hover:border-amber-800"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-4">
            <p className="font-medium text-gray-900">Quantity</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="p-2 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-medium text-gray-700 w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
              <p className="text-sm text-amber-600 ml-4">● In Stock</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 border-2 border-amber-800 text-amber-800 rounded-md font-medium hover:bg-amber-50 transition-colors">
              Add to cart
            </button>
            <button
              className="flex-1 py-3 rounded-md font-medium bg-amber-800 text-white hover:bg-amber-900 transition-colors"
              onClick={handlepayment}
            >
              Buy it now
            </button>
          </div>
          
          {/* Share */}
          {/* <div className="flex items-center gap-2 text-sm cursor-pointer text-gray-600 mt-4 justify-end">
            <Share2 size={16} />
            Share this product
          </div> */}
        </motion.div>
      </div>
      
      {/* Product Description */}
      <motion.div 
        className="mt-12 border-t pt-8 text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">
          This premium {product.title} is crafted with the finest materials to ensure comfort and style. 
          Perfect for formal occasions, business meetings, or any event where you want to make a statement.
          Our suits are tailored to perfection by expert craftsmen with decades of experience.
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-black">Premium Materials</h3>
            <p className="text-gray-600">Made with high-quality fabrics that ensure comfort and durability.</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-black">Expert Tailoring</h3>
            <p className="text-gray-600">Each piece is carefully crafted by our master tailors for the perfect fit.</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-black">Attention to Detail</h3>
            <p className="text-gray-600">Fine stitching and premium finishes make our suits stand out.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
