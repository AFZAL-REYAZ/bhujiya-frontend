/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-green': '#1a5d1a', // Dark green from screenshot
        'brand-red': '#c62828',   // Red from screenshot
        'brand-yellow': '#fbc02d', // Yellow/Orange from footer
        'brand-light-green': '#e8f5e9', // Light background
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};
