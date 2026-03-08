import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppChat from "./WhatsAppChat";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-[75vh]">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppChat />
    </>
  );
};

export default PublicLayout;
