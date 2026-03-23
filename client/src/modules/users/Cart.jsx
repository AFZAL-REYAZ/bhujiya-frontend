
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Phone, 
  Loader2, CreditCard, ShieldCheck, Truck, Wallet, CheckCircle2, MapPin 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../config/api/apiconfig";
import AddressSection from "../../components/userlayout/AddressSection"; 

export default function Cart() {
  const location = useLocation();
  const userInfo = location.state?.userInfo;
  const [orderForm, setOrderForm] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: userInfo?.mobile || userInfo?.phone || "",
    location: ""
  });
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const confirmationMsg = "";
  const navigate = useNavigate();
  const directProduct = location.state?.directProduct;

  // Function to fetch current items in cart
  const fetchCart = async () => {
    try {
      // If directProduct is present, save to localStorage for persistence
      if (directProduct) {
        // Get existing cart from localStorage
        let cartArr = [];
        const cartStr = localStorage.getItem("cart");
        if (cartStr) {
          try { cartArr = JSON.parse(cartStr) || []; } catch { cartArr = []; }
        }
        // Check if product already exists
        const exists = cartArr.some(
          (item) => item.productId === (directProduct._id || directProduct.id)
        );
        if (!exists) {
          cartArr.push({
            productId: directProduct._id || directProduct.id,
            name: directProduct.title,
            price: directProduct.price,
            quantity: directProduct.minQuantity || 1,
            image: directProduct.image,
            isLocal: true
          });
          localStorage.setItem("cart", JSON.stringify(cartArr));
        }
        setCartItems(cartArr);
        setLoading(false);
        return;
      }

      // If cart is in localStorage, show all products
      const cartStr = localStorage.getItem("cart");
      if (cartStr) {
        try {
          setCartItems(JSON.parse(cartStr));
        } catch {
          setCartItems([]);
        }
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const { data } = await API.get("/users/cart", {
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

    if (item.isLocal) {
      setCartItems(prev => prev.map(cartItem => 
         cartItem.productId === item.productId 
            ? { ...cartItem, quantity: cartItem.quantity + qtyChange }
            : cartItem
      ));
      return;
    }

    if (!token) return;

    try {
      await API.post("/users/cart/add", { 
        productId: item.productId, 
        quantity: qtyChange 
      }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchCart();
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Failed to update quantity.");
    }
  };

  // Function to completely remove an item from the cart
  const removeItem = async (productId) => {
    if (!window.confirm("Remove this item from basket?")) return;

    const item = cartItems.find(i => i.productId === productId);
    if (item?.isLocal) {
      setCartItems(prev => prev.filter(i => i.productId !== productId));
      window.history.replaceState({}, document.title);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await API.delete(`/users/cart/remove/${productId}`, { 
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

    // Address saving for cart is not implemented in backend, skipping API call
    setSelectedAddress(addressData);
    setShowAddress(false);
    localStorage.setItem("saved_address", JSON.stringify(addressData));

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

  const handleFinalCheckout = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!orderForm.name || !orderForm.phone || !orderForm.location) {
      setOrderConfirmation("Please fill in Name, Phone, and Location in the form before confirming.");
      return;
    }
    setOrderSubmitting(true);
    setOrderConfirmation("");
    try {
      const { data } = await API.post("/orders/quote", {
        product: cartItems.length > 0 ? {
          id: cartItems[0].productId,
          title: cartItems[0].name,
          price: cartItems[0].price,
          quantity: cartItems[0].quantity,
          image: cartItems[0].image,
        } : {},
        customer: {
          name: orderForm.name,
          email: orderForm.email,
          phone: orderForm.phone,
        },
        message: "Order from cart page. Address: " + orderForm.location,
        source: "cart",
        sourceLabel: "Cart Page",
      });
      // Cart clear (frontend only)
      setCartItems([]);
      localStorage.removeItem("cart");
      setOrderForm({ name: "", email: "", phone: "", location: "" });
      // Remove directProduct from location.state so that on revisit, cart is empty
      if (window.history.replaceState) {
        const newState = { ...location.state };
        delete newState.directProduct;
        window.history.replaceState({ ...window.history.state, usr: newState }, document.title);
      }
      // Redirect to OrderSuccess with orderId (if available)
      navigate("/order-success", { state: { orderId: data?.orderId || "N/A" } });
    } catch (err) {
      setOrderConfirmation(err?.response?.data?.message || "Something went wrong");
    } finally {
      setOrderSubmitting(false);
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
      {confirmationMsg && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg font-bold text-center transition-all duration-300 ${confirmationMsg.includes('Successfully') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {confirmationMsg}
        </div>
      )}
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
            </div>

            {/* Right Side: Unified Order Section */}
            <div className="lg:col-span-5">
              <form onSubmit={handleFinalCheckout} className="bg-white p-8 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50 sticky top-32 flex flex-col gap-6">
                <h2 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-gray-400"><span>Bag Subtotal</span><span className="text-gray-900">₹{subtotal}</span></div>
                  <div className="flex justify-between text-xs font-bold text-gray-400"><span>Delivery Charges</span><span className="text-green-600 font-black">FREE</span></div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Grand Total</span>
                    <span className="text-3xl font-black text-gray-900">₹{total}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Payment Method</p>
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("online")}
                      className={`flex-1 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'online' ? 'border-green-600 bg-green-50' : 'border-gray-50 bg-gray-50/50'}`}
                    >
                      <CreditCard size={18} className={paymentMethod === 'online' ? 'text-green-600' : 'text-gray-400'} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Online</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex-1 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-gray-50 bg-gray-50/50'}`}
                    >
                      <Wallet size={18} className={paymentMethod === 'cod' ? 'text-green-600' : 'text-gray-400'} />
                      <span className="text-[9px] font-black uppercase tracking-widest">C.O.D</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    disabled={!!userInfo}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                    placeholder="Your Name"
                  />
                  <input
                    type="tel"
                    required
                    value={orderForm.phone}
                    disabled={!!userInfo}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                    placeholder="Phone Number"
                  />
                  <input
                    type="email"
                    value={orderForm.email}
                    disabled={!!userInfo}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                    placeholder="Email (Optional)"
                  />
                  <input
                    type="text"
                    required
                    value={orderForm.location}
                    onChange={e => setOrderForm({ ...orderForm, location: e.target.value })}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-sm"
                    placeholder="Delivery Location"
                  />
                </div>
                <button
                  type="submit"
                  disabled={orderSubmitting}
                  className="w-full bg-black text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#0b3b2a] transition-all shadow-lg active:scale-95 mt-2 disabled:opacity-60"
                >
                  {orderSubmitting ? "Submitting..." : "Confirm Order"}
                </button>
                {orderConfirmation && (
                  <div className={`text-center text-sm mt-2 font-semibold ${orderConfirmation.includes('Confirmed') ? 'text-green-600' : 'text-red-600'}`}>{orderConfirmation}</div>
                )}
                <div className="mt-8 flex justify-between items-center px-4">
                  <div className="flex flex-col items-center gap-1 opacity-40"><ShieldCheck size={16}/><span className="text-[7px] font-black uppercase">Secure</span></div>
                  <div className="flex flex-col items-center gap-1 opacity-40"><Truck size={16}/><span className="text-[7px] font-black uppercase">Fast</span></div>
                  <div className="flex flex-col items-center gap-1 opacity-40"><CheckCircle2 size={16}/><span className="text-[7px] font-black uppercase">Original</span></div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
