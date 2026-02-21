import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Phone, 
  Loader2, CreditCard, ShieldCheck, Truck, Wallet, CheckCircle2, MapPin 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import AddressSection from "../components/AddressSection"; 

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  // Function to fetch current items in cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Cart Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchCart();

  const fetchUserAddress = async () => {
    // 1. Check LocalStorage first (Instant UI)
    const localAddr = localStorage.getItem("saved_address");
    if (localAddr) {
      setSelectedAddress(JSON.parse(localAddr));
      setShowAddress(false);
    }

    // 2. Fetch from Database (Source of Truth)
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await API.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.address && data.address.firstName) {
        setSelectedAddress(data.address);
        setShowAddress(false);
        // Sync local storage
        localStorage.setItem("saved_address", JSON.stringify(data.address));
      }
    } catch (err) {
      console.log("Database fetch failed or no address saved.");
    }
  };

  fetchUserAddress();
}, []);

  /**
   * FIXED: This function now sends all required fields (productId, name, price, image)
   * to satisfy the strict backend validation rules.
   */
  const updateQuantity = async (item, currentQty, actionType) => {
    const token = localStorage.getItem("token");
    
    // Prevent decreasing below minimum required quantity (Wholesale Check)
    const minAllowed = item.minQuantity || 1;
    if (actionType === 'minus' && currentQty <= minAllowed) {
      alert(`Minimum quantity for this item is ${minAllowed}`);
      return;
    };
    
    const qtyChange = actionType === 'plus' ? 1 : -1;

    try {
      // POSTing all required fields to /cart/add for validation
      await API.post("/cart/add", { 
        productId: item.productId, 
        name: item.name,           
        price: item.price,         
        image: item.image,         
        quantity: qtyChange 
      }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      fetchCart(); // Refresh UI after successful DB update
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Failed to update quantity.");
    }
  };

  // Function to completely remove an item from the cart
  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Remove this item from basket?")) return;

    try {
      await API.delete(`/cart/remove/${productId}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Remove Error:", err.response?.data);
      alert("Failed to remove item.");
    }
  };

  const handleAddressComplete = async (addressData) => {
  try {
    const token = localStorage.getItem("token");
    
    // Save to Database
    const { data } = await API.post("/cart/address", addressData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Update Local State with data from Database
    setSelectedAddress(data.address);
    setShowAddress(false);
    
    // Optional: Force a local storage backup as a failsafe
    localStorage.setItem("saved_address", JSON.stringify(data.address));
  } catch (err) {
    console.error("Save failed:", err);
    alert("Could not save address to database.");
  }
};

  const handleFinalCheckout = async () => {
    if (!selectedAddress) {
      setShowAddress(true);
      window.scrollTo({ top: 500, behavior: 'smooth' });
      return;
    }

    const token = localStorage.getItem("token");
    const orderData = {
      items: cartItems,
      address: selectedAddress,
      totalAmount: total,
      paymentMethod: paymentMethod,
    };

    try {
      const { data } = await API.post("/cart/checkout", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("🎉 Order Placed Successfully!");
      navigate("/order-success", { state: { orderId: data.order._id } });
    } catch (err) {
      alert("Order failed: " + (err.response?.data?.message || "Server Error"));
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
      <p className="text-gray-400 font-black tracking-widest uppercase text-[10px]">Syncing your basket...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 mb-10 text-gray-400 hover:text-black transition-all"
        >
          <div className="p-2 bg-white shadow-sm border border-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Continue Shopping</span>
        </motion.button>

        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-gray-100">
            <ShoppingBag className="mx-auto text-gray-100 mb-6" size={80} />
            <h2 className="text-3xl font-black text-gray-900 mb-2">Your basket is empty</h2>
            <p className="text-gray-400 text-sm mb-8">Looks like you haven't added any snacks yet.</p>
            <button onClick={() => navigate("/")} className="bg-black text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#0b3b2a] transition-all">Shop Now</button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Side: Items List */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-10">My Shopping <span className="text-green-600">Basket</span></h1>
              
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div 
                      layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }}
                      key={item.productId} 
                      className="flex items-center gap-4 md:gap-6 p-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm relative group"
                    >
                      <div className="w-24 h-24 bg-gray-50 rounded-2xl p-3 flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} className="max-h-full object-contain" alt={item.name} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-md font-black text-gray-800 truncate">{item.name}</h3>
                        <p className="text-green-600 font-bold text-sm">₹{item.price} / unit</p>
                        
                        <div className="flex items-center mt-3 gap-6">
                          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button 
                              onClick={() => updateQuantity(item, item.quantity, 'minus')} 
                              className="w-7 h-7 rounded-md bg-white flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all shadow-sm border border-gray-100"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-10 text-center font-black text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item, item.quantity, 'plus')} 
                              className="w-7 h-7 rounded-md bg-white flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm border border-gray-100"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="text-gray-900 font-black text-sm">₹{item.price * item.quantity}</div>
                        </div>
                      </div>

                      <button onClick={() => removeItem(item.productId)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Address Section */}
              <div className="mt-10">
  {!showAddress && !selectedAddress ? (
    /* 1. Initial State: No address and form is closed */
    <button 
      onClick={() => setShowAddress(true)}
      className="w-full py-10 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-green-400 hover:text-green-600 transition-all bg-white/50"
    >
      <MapPin size={24} />
      <span className="font-black uppercase tracking-widest text-[10px]">Set Delivery Address</span>
    </button>
  ) : showAddress ? (
    /* 2. Form State: Adding NEW or EDITING existing */
    <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100">
      <AddressSection 
        onAddressComplete={handleAddressComplete} 
        initialData={selectedAddress} 
      />
      {/* Optional: Cancel button to go back to summary */}
      {selectedAddress && (
        <button 
          onClick={() => setShowAddress(false)}
          className="w-full py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors"
        >
          Cancel Edit
        </button>
      )}
    </div>
  ) : (
    /* 3. Summary State: Using updated field names (firstName, lastName, houseNo) */
    <div className="p-6 bg-green-50 rounded-[2rem] border border-green-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10"><MapPin size={80}/></div>
      <h4 className="text-green-800 font-black uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
         <CheckCircle2 size={14}/> Shipping To:
         <span className="bg-green-200 px-2 py-0.5 rounded text-[8px]">{selectedAddress.addressType || 'Home'}</span>
      </h4>
      
      {/* Displaying split names */}
      <p className="font-black text-gray-900">
        {selectedAddress.firstName} {selectedAddress.lastName}
      </p>
      
      {/* Displaying detailed address fields */}
      <p className="text-gray-600 text-xs leading-relaxed mt-1">
        {selectedAddress.houseNo}, {selectedAddress.street}<br/>
        {selectedAddress.landmark && <span>Near {selectedAddress.landmark}, </span>}
        {selectedAddress.city}, {selectedAddress.district}<br/>
        {selectedAddress.state} - <span className="font-bold">{selectedAddress.pincode}</span>
      </p>

      <div className="flex items-center gap-4 mt-4">
        <button 
          onClick={() => setShowAddress(true)} 
          className="text-[10px] font-black text-[#0b3b2a] underline uppercase tracking-tighter hover:text-green-900"
        >
          Edit Address
        </button>
        
        <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
          <Phone size={10}/> {selectedAddress.phone}
        </p>
      </div>
    </div>
  )}
</div>
            </div>

            {/* Right Side: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50 sticky top-32">
                <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">Order Summary</h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Payment Method</p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setPaymentMethod("online")}
                        className={`flex-1 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'online' ? 'border-green-600 bg-green-50' : 'border-gray-50 bg-gray-50/50'}`}
                      >
                        <CreditCard size={18} className={paymentMethod === 'online' ? 'text-green-600' : 'text-gray-400'} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Online</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod("cod")}
                        className={`flex-1 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-gray-50 bg-gray-50/50'}`}
                      >
                        <Wallet size={18} className={paymentMethod === 'cod' ? 'text-green-600' : 'text-gray-400'} />
                        <span className="text-[9px] font-black uppercase tracking-widest">C.O.D</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-50">
                    <div className="flex justify-between text-xs font-bold text-gray-400"><span>Bag Subtotal</span><span className="text-gray-900">₹{subtotal}</span></div>
                    <div className="flex justify-between text-xs font-bold text-gray-400"><span>Delivery Charges</span><span className="text-green-600 font-black">FREE</span></div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Grand Total</span>
                      <span className="text-3xl font-black text-gray-900">₹{total}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleFinalCheckout}
                  className="w-full bg-black text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#0b3b2a] transition-all shadow-lg active:scale-95"
                >
                  {selectedAddress ? "Confirm & Pay" : "Set Address First"}
                </button>

                <div className="mt-8 flex justify-between items-center px-4">
                  <div className="flex flex-col items-center gap-1 opacity-40"><ShieldCheck size={16}/><span className="text-[7px] font-black uppercase">Secure</span></div>
                  <div className="flex flex-col items-center gap-1 opacity-40"><Truck size={16}/><span className="text-[7px] font-black uppercase">Fast</span></div>
                  <div className="flex flex-col items-center gap-1 opacity-40"><CheckCircle2 size={16}/><span className="text-[7px] font-black uppercase">Original</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
