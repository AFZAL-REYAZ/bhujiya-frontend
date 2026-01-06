import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChat = () => {
  return (
    <a
      href="https://wa.me/919102548287?text=Hello%20I%20want%20to%20know%20more%20about%20your%20products"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-70 animate-ping"></span>

      {/* Button */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-700 shadow-2xl hover:scale-110 transition-all duration-300">
        <FaWhatsapp className="text-white text-3xl" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        Chat with us on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppChat;
