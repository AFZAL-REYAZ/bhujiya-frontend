import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Loader2, Package, Calendar, MapPin, ChevronRight } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/cart/my-orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (err) {
        console.error("Fetch Orders Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-green-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
            My <span className="text-green-600">Orders</span>
          </h1>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500">Total Orders: {orders.length}</p>
          </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-xl">
            <Package className="mx-auto text-gray-200 mb-4" size={80} />
            <p className="text-gray-500 text-xl font-bold">No orders found yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0b3b2a] transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={order._id}
                className="bg-white overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Header */}
                <div className="p-8 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4 bg-gray-50/50">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white bg-green-600 px-4 py-1.5 rounded-full">
                        {order.status || 'Confirmed'}
                      </span>
                      <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={12}/> {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <h3 className="text-xs font-mono text-gray-400">ORDER ID: {order._id}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                    <p className="text-3xl font-black text-gray-900">₹{order.totalAmount}</p>
                  </div>
                </div>

                {/* Clickable Items Section */}
                <div className="p-8">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Items Ordered</p>
                  <div className="grid grid-cols-1 gap-4">
                    {order.items.map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => navigate(`/product/${item.productId}`)}
                        className="group flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-green-100 hover:bg-green-50/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl p-2 flex-shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 group-hover:text-[#0b3b2a] transition-colors">{item.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity} • ₹{item.price}</p>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-300 group-hover:text-green-500 transition-all" size={20} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer / Address */}
                <div className="px-8 py-4 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={14} className="text-red-500" />
                    <p className="text-xs font-bold">{order.address.fullName}, {order.address.city} - {order.address.pincode}</p>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-tighter text-blue-600 hover:underline">
                    Download Invoice
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
