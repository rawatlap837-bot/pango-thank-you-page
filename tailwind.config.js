/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Extra-small breakpoint so very small phones (360px) get their own tweaks
      screens: {
        xs: "420px",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        // Purple shades for backgrounds and cards
        brand: {
          50: "#f5f0ff",
          100: "#ebe0ff",
          200: "#d4c1ff",
          300: "#b497ff",
          400: "#9566f5",
          500: "#7a3fe0",
          600: "#6128c2",
          700: "#4b1c9a",
          800: "#33106f",
          900: "#220a4d",
          950: "#14062f",
        },
        // Yellow for buttons and the highlighted timer
        gold: {
          300: "#ffe08a",
          400: "#ffc83d",
          500: "#f5b400",
          600: "#d99a00",
        },
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(255, 200, 61, 0.5)",
        "glow-sm": "0 0 36px -10px rgba(255, 200, 61, 0.45)",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.97)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
