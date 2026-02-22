import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { 
  Loader2, 
  Package, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ShoppingBag,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Calls the backend route: /api/cart/my-orders
      const { data } = await API.get("/cart/my-orders");
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Fetch Orders Error", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Status Badge Color Helper
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
      <p className="text-gray-500 font-medium animate-pulse">Fetching your orders...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              My <span className="text-green-600">Orders</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Manage and track your recent purchases</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 self-start">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total History</p>
            <p className="text-2xl font-black text-gray-900">{orders.length} Orders</p>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center font-bold">
            {error}
          </div>
        )}
        
        <AnimatePresence>
          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-xl"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-gray-200" size={48} />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">No orders yet!</h2>
              <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
                Looks like you haven't discovered our delicious bhujiya varieties yet.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 hover:shadow-lg hover:shadow-green-100 transition-all flex items-center gap-3 mx-auto"
              >
                <ShoppingBag size={20} />
                Explore Shop
              </button>
            </motion.div>
          ) : (
            <div className="space-y-10">
              {orders.map((order) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={order._id}
                  className="bg-white overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
                >
                  {/* Order Header Card */}
                  <div className="p-8 border-b border-gray-50 flex flex-wrap justify-between items-start gap-4 bg-gray-50/30">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                          {order.status || 'Processing'}
                        </span>
                        <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                          <Calendar size={14} className="text-green-600"/> 
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Transaction ID</p>
                        <h3 className="text-sm font-mono font-medium text-gray-500">#{order._id.slice(-12).toUpperCase()}</h3>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Grand Total</p>
                      <p className="text-4xl font-black text-gray-900 tracking-tighter">₹{order.totalAmount}</p>
                      <p className="text-[10px] font-bold text-green-600 uppercase mt-1">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 gap-4">
                      {order.items.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => navigate(`/product/${item.productId}`)}
                          className="group/item flex items-center justify-between p-4 rounded-3xl border border-gray-50 hover:border-green-100 hover:bg-green-50/30 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 flex-shrink-0 relative overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500" 
                              />
                            </div>
                            <div>
                              <h4 className="font-black text-gray-800 text-lg leading-tight group-hover/item:text-green-700 transition-colors">{item.name}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <p className="text-sm font-bold text-gray-400">Qty: {item.quantity}</p>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <p className="text-sm font-black text-green-600">₹{item.price}</p>
                              </div>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover/item:bg-green-600 group-hover/item:text-white transition-all">
                            <ChevronRight size={20} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer - Shipping Info */}
                  <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 text-gray-600">
                      <div className="mt-1 bg-red-100 p-1.5 rounded-lg">
                        <MapPin size={16} className="text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Delivering to</p>
                        <p className="text-sm font-bold text-gray-800 leading-tight">
                          {order.address.fullName}, {order.address.houseNo}, {order.address.city} - {order.address.pincode}
                        </p>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors group">
                      <Package size={14} className="group-hover:bounce" />
                      Track Shipment
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}