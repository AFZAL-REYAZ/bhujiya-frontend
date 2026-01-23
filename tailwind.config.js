/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-green': '#1a5d1a',
        'brand-red': '#c62828',
        'brand-yellow': '#fbc02d',
        'brand-light-green': '#e8f5e9',
      },

      /* ================= KEYFRAMES ================= */
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        slideUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },

      /* ================= ANIMATIONS ================= */
      animation: {
        marquee: "marquee 20s linear infinite",
        slideUp: "slideUp 0.8s ease-out forwards",
        fadeInSlow: "fadeIn 2s ease-in-out",
        pulseSlow: "pulse 2.5s infinite",
        bounceSlow: "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
