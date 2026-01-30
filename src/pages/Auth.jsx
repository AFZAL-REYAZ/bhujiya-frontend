import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // Jo axios setup humne kiya tha
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? "/users/login" : "/users/signup";

    try {
      const { data } = await API.post(endpoint, formData);
      
      // Token aur User info save karna
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, id: data._id }));
      
      alert(`Welcome ${data.name}!`);
      navigate("/"); // Home page par redirect
      window.location.reload(); // Header update karne ke liye
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header Tab */}
        <div className="flex">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 font-bold transition-all ${isLogin ? "bg-brand-yellow text-red-600" : "bg-gray-100 text-gray-400"}`}
          >
            LOGIN
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 font-bold transition-all ${!isLogin ? "bg-brand-yellow text-red-600" : "bg-gray-100 text-gray-400"}`}
          >
            SIGNUP
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-800 uppercase italic">
              {isLogin ? "Welcome Back" : "Join the Family"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">Maa Kavita Lakxmi Pvt. Ltd.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 size={20}" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 size={20}" />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 size={20}" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 group transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  {isLogin ? "LOGIN NOW" : "CREATE ACCOUNT"}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;