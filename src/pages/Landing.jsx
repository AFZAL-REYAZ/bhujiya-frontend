import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Zap, Award, Sparkles, MoveRight } from "lucide-react";
import { FaStar, FaArrowRight, FaLeaf, FaTruck, FaShieldAlt, FaShoppingCart } from "react-icons/fa";
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
<section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-red-950 via-red-800 to-red-900 text-white py-20 px-4 overflow-hidden">
  
  {/* 1. Animated Decorative Background Elements */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Moving Glow Blobs */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1], 
        x: [0, 40, 0], 
        y: [0, 60, 0],
        rotate: [0, 45, 0] 
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]"
    />
    <motion.div 
      animate={{ 
        scale: [1.3, 1, 1.3], 
        x: [0, -60, 0],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]"
    />
    {/* Subtle Pattern Overlay */}
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
  </div>

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 z-10 relative">
    
    {/* 2. Text Content with Staggered Fade-In */}
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
      }}
      className="text-center md:text-left"
    >
      <motion.h2 
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        className="text-2xl md:text-3xl font-script text-yellow-400 mb-4 italic drop-shadow-md"
      >
        Tasty and Crunchy
      </motion.h2>

      <motion.h1 
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight"
      >
        Khawo <span className="text-yellow-300 relative inline-block">
          Jaldi
          {/* Hand-drawn underline effect */}
          <motion.svg 
            className="absolute -bottom-2 left-0 w-full h-3" 
            viewBox="0 0 100 10" 
            preserveAspectRatio="none"
          >
            <motion.path 
              d="M0 5 Q 50 10 100 5" 
              stroke="#fbbf24" 
              strokeWidth="4" 
              fill="transparent" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </motion.svg>
        </span> 
        <br/>
        <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-200 bg-clip-text text-transparent">
          Raho Healthy
        </span>
      </motion.h1>

      <motion.p 
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.9 } }}
        className="text-red-100 mb-10 max-w-md text-lg leading-relaxed border-l-4 border-yellow-400/50 pl-6"
      >
        Experience the authentic taste of tradition with our rich, dry-fruit loaded plum cakes and signature snacks.
      </motion.p>

      <motion.div 
        variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        className="flex flex-wrap justify-center md:justify-start gap-5"
      >
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(251, 191, 36, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-red-900 px-10 py-4 rounded-full font-black text-lg transition shadow-2xl uppercase tracking-wider hover:bg-yellow-50"
        >
          Shop Now
        </motion.button>
        <motion.button 
          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,1)" }}
          className="border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg transition"
        >
          Explore More
        </motion.button>
      </motion.div>
    </motion.div>

    {/* 3. Hero Image with Floating & Tilt Effects */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
      animate={{ opacity: 1, scale: 1, rotate: -5 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
      className="relative flex justify-center group"
    >
      {/* Background Glow behind image */}
      <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-[100px] group-hover:bg-yellow-400/30 transition-colors duration-700 scale-75" />
      
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [-5, -2, -5] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative z-10"
      >
        <img 
          src={bhujiya} 
          alt="Featured Snack" 
          className="w-full max-w-md rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border-4 border-white/10 backdrop-blur-sm transform transition duration-700 group-hover:rotate-0 group-hover:scale-105" 
        />
        
        {/* Floating Price/Offer Badge */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-8 -right-8 bg-yellow-400 text-red-900 h-28 w-28 rounded-full flex flex-col items-center justify-center font-black shadow-2xl border-4 border-white rotate-12 z-20"
        >
          <span className="text-xs">SALE</span>
          <span className="text-2xl">₹90</span>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Plum Cake Collection (Enhanced) */}
<section className="py-24 bg-gradient-to-b from-red-50 to-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* Section Header with Animation */}
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs">Premium Choice</span>
      <h2 className="text-4xl md:text-5xl font-black text-red-950 mt-2">
        Our Top Selling Products
      </h2>
      <div className="h-1.5 w-20 bg-red-600 mx-auto mt-4 rounded-full" />
    </motion.div>

    {/* Grid with Staggered Children */}
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.2 }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-10"
    >
      {plumCakes.map((cake, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          whileHover={{ y: -12 }}
          className="group relative bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(220,38,38,0.15)] transition-all duration-500 border border-red-50/50"
        >
          {/* Image Container with Zoom & Overlay */}
          <div className="relative overflow-hidden rounded-[2.2rem] aspect-[4/5]">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src={cake.image} 
              alt={cake.title} 
              className="w-full h-full object-cover" 
            />
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Quick Tag (if tag exists) */}
            {cake.tag && (
              <div className="absolute top-5 left-5 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                {cake.tag}
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-extrabold text-gray-800 mb-2 group-hover:text-red-700 transition-colors duration-300">
              {cake.title}
            </h3>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-2xl font-black text-red-600">₹{cake.price}</span>
              <span className="text-gray-400 line-through text-sm italic">₹{parseInt(cake.price) + 40}</span>
            </div>

            {/* Interactive Button */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="w-full bg-red-900 text-white py-4 rounded-2xl font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* Feature Product - Banana Wafers (Enhanced) */}
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
    
    {/* Left Side: Animated Image with Glow Background */}
    <div className="md:w-1/2 relative">
      {/* Decorative blurred circle behind image */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 bg-green-100 rounded-full blur-3xl opacity-60 scale-75"
      />
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        animate={{ 
          y: [0, -15, 0] 
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.8 }
        }}
        className="relative z-10"
      >
        <img 
          src={chilliBana} 
          alt="Banana Wafers" 
          className="rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-white ring-4 ring-yellow-400/20 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Floating Badge */}
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 right-10 bg-green-600 text-white p-4 rounded-2xl shadow-xl border-4 border-white rotate-12"
        >
          <p className="text-xs font-bold uppercase tracking-tighter">Hand-Made</p>
          <p className="text-xl font-black italic">Original</p>
        </motion.div>
      </motion.div>
    </div>

    {/* Right Side: Content with Staggered Reveal */}
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15 }
        }
      }}
      className="md:w-1/2"
    >
      <motion.div variants={{ hidden: { x: 20, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
        <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs uppercase tracking-widest mb-4">
          Freshly Sliced
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-green-950 mb-6 leading-tight">
          Ultra Thin <br/> 
          <span className="text-green-600 italic">Banana Chips</span>
        </h2>
      </motion.div>

      <motion.p 
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl"
      >
        Authentic Banana Chips, fried in pure oil for that traditional taste and crunch. 
        Perfectly sliced, ultra-thin wafers that melt in your mouth. Experience the 
        real crunch of South India in every pack.
      </motion.p>

      {/* Feature Icons */}
      <motion.div 
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <div className="h-2 w-2 bg-yellow-400 rounded-full" /> No Preservatives
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <div className="h-2 w-2 bg-yellow-400 rounded-full" /> 100% Pure Coconut Oil
        </div>
      </motion.div>

      {/* Weight Selector */}
      <motion.div 
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        className="flex gap-3 mb-10"
      >
        {['100g', '200g', '500g'].map((weight, i) => (
          <motion.button 
            key={weight}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-xl font-bold transition-all border-2 ${
              i === 0 
              ? "bg-green-700 border-green-700 text-white shadow-lg shadow-green-700/30" 
              : "border-gray-200 text-gray-500 hover:border-green-700 hover:text-green-700"
            }`}
          >
            {weight}
          </motion.button>
        ))}
      </motion.div>

      {/* Buy Buttons */}
      <motion.div 
        variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
        className="flex gap-4"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-green-800 transition-all flex items-center justify-center gap-2"
        >
          Add to Cart
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-red-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-red-800 transition-all"
        >
          Buy Now
        </motion.button>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Best Sellers Section */}
<section className="py-24 bg-gradient-to-b from-green-50/50 to-white relative overflow-hidden">
  
  {/* Background Glow */}
  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-green-200/20 rounded-full blur-[100px] pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: "48px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-green-600 rounded-full"
          />
          <span className="text-green-700 font-black uppercase tracking-[0.2em] text-[10px]">Customer Favorites</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-green-950 tracking-tight">Our Best Sellers</h2>
      </motion.div>

      {/* VIEW ALL BUTTON STYLE */}
      <motion.a 
        href="#" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group overflow-hidden px-8 py-3 rounded-full bg-white border-2 border-green-600 text-green-700 font-black text-sm uppercase tracking-widest transition-all hover:text-white"
      >
        <span className="relative z-10 flex items-center gap-2">
          View All <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </span>
        <motion.div 
          className="absolute inset-0 bg-green-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" 
        />
      </motion.a>
    </div>

    {/* Product Grid */}
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
    >
      {bestSellers.map((product, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
          className="group"
        >
          {/* Enhanced Card Styling */}
          <div className="bg-white p-4 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(21,128,61,0.1)] hover:-translate-y-2">
            
            <div className="relative overflow-hidden rounded-[2rem] mb-4 bg-gray-50 aspect-square">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src={product.image} 
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="text-center px-2">
              <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{product.title}</h3>
              <p className="text-green-700 font-black text-lg mb-4">₹{product.price}</p>

              {/* PRODUCT ADD BUTTON STYLE */}
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 20px -5px rgba(21, 128, 61, 0.5)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full overflow-hidden bg-green-700 text-white py-3 rounded-2xl font-black text-xs uppercase tracking-tighter group/btn"
              >
                {/* Shimmer Effect */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaShoppingCart className="text-[10px] group-hover/btn:rotate-12 transition-transform" /> 
                  Add to Cart
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
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
