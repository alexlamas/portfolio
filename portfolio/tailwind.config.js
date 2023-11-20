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
      opacity: {
        '1': '0.01',
        '3': '0.03',
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        foreground: "#121115",
        background: "#F4F4F5",
        border: "#12111515",
        highlight: "#CF00E1",
      },
      dark: {
        foreground: "#F4F4F5",
        background: "#18181B",
        border: "#FFFFFF1A",
        highlight: "blue",
      },
    }),
  ],
};
