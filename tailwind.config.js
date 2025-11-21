/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  safelist: ["neutral", "electric", "sunset", "matrix"],
  theme: {
    fontFamily: {
      sans: ["pp_moriregular"],
      serif: ["pp_writerbold"],
      mono: ["pp_neue_montreal_monobook"],
    },
    animation: {
      "spin-slow": "spin 3s linear infinite",
      spin: "spin 1s linear infinite",
    },
    extend: {
      transitionProperty: {
        "background-image": "background-image",
      },
      animation: {
        ticker: "ticker 60s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      opacity: {
        1: "0.01",
        3: "0.03",
      },
    },
  },
  plugins: [
    createThemes({
      "neutral": {
        foreground: "#FAFAFA",
        background: "#0A0A0A",
        border: "#FFFFFF15",
        highlight: "#FAFAFA",
      },
      // Design 1: Electric Brutalist - stark contrast with electric blue accent
      "electric": {
        foreground: "#FFFFFF",
        background: "#000000",
        border: "#00D4FF40",
        highlight: "#00D4FF",
      },
      // Design 2: Sunset Warmth - rich burgundy with golden accents
      "sunset": {
        foreground: "#FFF5E6",
        background: "#1A0A14",
        border: "#FF6B3530",
        highlight: "#FFB347",
      },
      // Design 3: Matrix Cyber - dark with neon green accents
      "matrix": {
        foreground: "#E0FFE0",
        background: "#0D1208",
        border: "#00FF4130",
        highlight: "#00FF41",
      },
    }),
  ],
};
