/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
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
      light: {
        foreground: "#121115",
        background: "#F2F3F5",
        border: "#12111515",
        highlight: "#D97757",
      },
      dark: {
        foreground: "#F4F4F5",
        background: "#18181B",
        border: "#FFFFFF1A",
        highlight: "plum",
      },
    }),
  ],
};
