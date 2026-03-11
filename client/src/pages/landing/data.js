import bananaChilli from "../../assets/banana/bananaChilli.jpeg";
import bananaChips from "../../assets/banana/bananaChips.jpeg";
import bananaPowder from "../../assets/banana/bananaPowder.jpeg";
import bananaSalti from "../../assets/banana/bananaSalti.jpeg";
import chilliBana from "../../assets/banana/chilliBana.jpeg";
import bananach5 from "../../assets/banana/bananach5.jpeg";

import crousel1 from "../../assets/carousel/crousel1.jpeg";
import crousel2 from "../../assets/carousel/crousel2.jpeg";
import crousel3 from "../../assets/carousel/crousel3.jpeg";
import crousel4 from "../../assets/carousel/crousel4.jpeg";
import crousel5 from "../../assets/carousel/crousel5.jpeg";
import crousel6 from "../../assets/carousel/crousel6.jpeg";

export const heroImages = [
  crousel1,
  crousel2,
  crousel3,
  crousel4,
  crousel5,
  crousel6,
];

export const featuredProducts = [
  {
    id: "feat1",
    title: "Signature Banana Chips",
    price: "290",
    image: chilliBana,
    quantity: "1 Kg",
  },
  {
    id: "feat2",
    title: "Natural Banana Powder",
    price: "500",
    image: bananaPowder,
    quantity: "1 Kg",
  },
  {
    id: "feat3",
    title: "Banana Length Pepper",
    price: "81",
    image: bananach5,
    quantity: "100 g",
  },
  {
    id: "best2",
    title: "Spicy Banana Chips",
    price: "81",
    image: bananaChilli,
    quantity: "100 g",
  },
  {
    id: "best4",
    title: "Banana Salty Chips",
    price: "81",
    image: bananaSalti,
    quantity: "100 g",
  },
];

export const bestSellers = [
  {
    id: "best1",
    title: "Ultra Thin Banana Chips",
    price: "400",
    image: chilliBana,
    quantity: "1 Kg",
  },
  {
    id: "best2",
    title: "Spicy Banana Chips",
    price: "151",
    image: bananaChilli,
    quantity: "200 g",
  },
  {
    id: "best3",
    title: "Classic Banana Chips",
    price: "400",
    image: bananaChips,
    quantity: "1 kg",
  },
  {
    id: "best4",
    title: "Banana Salty Chips",
    price: "151",
    image: bananaSalti,
    quantity: "200 g",
  },
  {
    id: "best5",
    title: "Banana Powder",
    price: "500",
    image: bananaPowder,
    quantity: "1 Kg",
  },
];

const productDetailsById = {
  feat1: {
    brand: "jaldichips",
    packagingSize: "1 Kg",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
  feat2: {
    brand: "jaldichips",
    packagingSize: "1 Kg",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
  feat3: {
    brand: "jaldichips",
    packagingSize: "100 g",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
  best1: {
    brand: "jaldichips",
    packagingSize: "1 Kg",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
  best2: {
    brand: "jaldichips",
    packagingSize: "100 g",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
  best3: {
    brand: "jaldichips",
    packagingSize: "100 g",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
  best4: {
    brand: "jaldichips",
    packagingSize: "100 g",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
  best5: {
    brand: "jaldichips",
    packagingSize: "1 Kg",
    shelfLife: "4 Months",
    origin: "Made in India",
    ingredients: "G9 Banana + Rice Oil + flavour - salty",
    vegetarian: "Yes",
  },
};

export const getProductDetails = (prod) => {
  if (!prod) return {};
  return (
    productDetailsById[prod.id] || {
      brand: "jaldichips",
      packagingSize: prod.quantity || "200 g",
      shelfLife: "4 Months",
      origin: "Made in India",
      ingredients: "G9 Banana + Rice Oil + flavour - salty",
      vegetarian: "Yes",
    }
  );
};
