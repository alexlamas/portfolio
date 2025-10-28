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
        foreground: "#00084a",
        background: "#e9e7ff",
        border: "#12111515",
        highlight: "#00084a",
      },
      dark: {
        foreground: "#e9e7ff",
        background: "#00084a",
        border: "#FFFFFF1A",
        highlight: "#e9e7ff",
      },
      "ink": {
        foreground: "#FAFAFA",
        background: "#0A0A0A",
        border: "#FFFFFF15",
        highlight: "#FAFAFA",
      },
      "ivory": {
        foreground: "#0A0A0A",
        background: "#FAFAFA",
        border: "#0A0A0A15",
        highlight: "#0A0A0A",
      },
      "midnight": {
        foreground: "#F4E4C1",
        background: "#1A1A2E",
        border: "#F4E4C115",
        highlight: "#E7B10A",
      },
      "champagne": {
        foreground: "#1A1A2E",
        background: "#F4E4C1",
        border: "#1A1A2E15",
        highlight: "#C79100",
      },
      "forest": {
        foreground: "#FFE8D6",
        background: "#0D3B2E",
        border: "#FFE8D615",
        highlight: "#FF8B5A",
      },
      "peach": {
        foreground: "#0D3B2E",
        background: "#FFE8D6",
        border: "#0D3B2E15",
        highlight: "#FF5722",
      },
      "graphite": {
        foreground: "#F8F8F8",
        background: "#2D2D2D",
        border: "#F8F8F815",
        highlight: "#FF6B9D",
      },
      "rose": {
        foreground: "#2D2D2D",
        background: "#F8F8F8",
        border: "#2D2D2D15",
        highlight: "#E91E63",
      },
    }),
  ],
};
