import React from "react";
import LandingPage from "./landing/LandingPage";

const Landing = ({ products = [] }) => {
  return <LandingPage products={products} />;
};

export default Landing;
