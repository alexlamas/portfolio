/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  safelist: ["mondrian"],
  theme: {
    fontFamily: {
      sans: ["pp_moriregular"],
      serif: ["pp_writerbold"],
      mono: ["pp_neue_montreal_monobook"],
    },
    extend: {
      colors: {
        'mondrian-red': '#D40920',
        'mondrian-blue': '#1356A2',
        'mondrian-yellow': '#F7D842',
        'mondrian-black': '#0A0A0A',
        'mondrian-cream': '#FAF8F5',
      },
    },
  },
  plugins: [
    createThemes({
      "mondrian": {
        foreground: "#0A0A0A",
        background: "#FAF8F5",
        border: "#0A0A0A",
        highlight: "#D40920",
      },
    }),
  ],
};
