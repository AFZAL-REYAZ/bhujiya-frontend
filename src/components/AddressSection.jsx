import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Navigation, Home, Phone, User, Loader2, 
  Asterisk, AlertCircle, Building2, Landmark, Map, 
  Briefcase, CheckCircle2 
} from "lucide-react";

export default function AddressSection({ onAddressComplete, initialData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Initial State
  const [address, setAddress] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    phone: initialData?.phone || "",
    houseNo: initialData?.houseNo || "",
    street: initialData?.street || "",
    landmark: initialData?.landmark || "",
    city: initialData?.city || "",
    district: initialData?.district || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
    addressType: initialData?.addressType || "Home",
  });

  // CRITICAL FIX: Sync state when initialData (from DB) arrives or changes
  useEffect(() => {
    if (initialData) {
      setAddress({ ...initialData });
    }
  }, [initialData]);

  const isFormValid = [
    address.firstName, address.phone, address.houseNo, 
    address.street, address.city, address.district, 
    address.state, address.pincode
  ].every((value) => value && value.trim() !== "");

  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const addr = data.address;

            setAddress((prev) => ({
              ...prev,
              street: addr.road || addr.suburb || prev.street,
              city: addr.city || addr.town || prev.city,
              district: addr.city_district || addr.county || prev.district,
              state: addr.state || prev.state,
              pincode: addr.postcode || prev.pincode,
            }));
          } catch (err) {
            setError("Auto-detect failed. Please type your address.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Location access denied. Please enable GPS.");
          setLoading(false);
        }
      );
    }
  };

  const inputStyle = "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none font-bold text-gray-800 text-sm placeholder:text-gray-400 placeholder:font-medium";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 md:p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-100 rounded-2xl text-green-600">
              <MapPin size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {initialData ? "Edit Address" : "New Address"}
            </h2>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-14">Secure Express Delivery</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGetCurrentLocation}
          className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Navigation size={16} />}
          Use Current Location
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-bold">
            <AlertCircle size={20} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Section 1: Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500" size={18} />
            <input type="text" placeholder="First Name *" className={`${inputStyle} pl-14`} value={address.firstName} onChange={(e) => setAddress({...address, firstName: e.target.value})} />
          </div>
          <input type="text" placeholder="Last Name" className={inputStyle} value={address.lastName} onChange={(e) => setAddress({...address, lastName: e.target.value})} />
          <div className="md:col-span-2 relative group">
            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500" size={18} />
            <input type="tel" placeholder="10-Digit Mobile Number *" className={`${inputStyle} pl-14`} value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} />
          </div>
        </div>

        {/* Section 2: Building Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100">
          <div className="md:col-span-2">
             <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4 flex items-center gap-2"><Building2 size={12}/> Address Details</p>
          </div>
          <input type="text" placeholder="House / Flat / Office No. *" className={inputStyle} value={address.houseNo} onChange={(e) => setAddress({...address, houseNo: e.target.value})} />
          <input type="text" placeholder="Street / Society / Area *" className={inputStyle} value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="Landmark (Optional)" className={`${inputStyle} md:col-span-2`} value={address.landmark} onChange={(e) => setAddress({...address, landmark: e.target.value})} />
        </div>

        {/* Section 3: Region Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Pincode *" className={inputStyle} value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} />
          <input type="text" placeholder="District *" className={inputStyle} value={address.district} onChange={(e) => setAddress({...address, district: e.target.value})} />
          <input type="text" placeholder="City *" className={inputStyle} value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="State *" className={inputStyle} value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
        </div>

        {/* Section 4: Address Type Selection */}
        <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
            {[
              { id: 'Home', icon: <Home size={16}/> },
              { id: 'Work', icon: <Briefcase size={16}/> }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setAddress({...address, addressType: type.id})}
                className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  address.addressType === type.id 
                  ? "bg-white text-green-600 shadow-sm ring-1 ring-black/5" 
                  : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {type.icon} {type.id}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            onClick={() => onAddressComplete(address)}
            disabled={!isFormValid}
            className={`flex-1 w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
              isFormValid 
              ? "bg-gray-900 text-white shadow-2xl shadow-gray-500/20" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {initialData ? "Update & Proceed" : "Save & Deliver Here"}
            {isFormValid && <CheckCircle2 size={18} className="text-green-400"/>}
          </motion.button>
        </div>
      </div>

      <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em] mt-10">
        <Asterisk size={10} className="inline mr-1 text-red-300" /> All Starred fields are strictly mandatory for delivery
      </p>
    </motion.div>
  );
}