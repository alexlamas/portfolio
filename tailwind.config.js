/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["pp_moriregular"],
      serif: ["pp_writerbold"],
      mono: ["pp_neue_montreal_monobook"],
    },
    extend: {
      colors: {
        'mondrian': {
          red: '#D40920',
          blue: '#1356A2',
          yellow: '#F7D842',
          black: '#0A0A0A',
          cream: '#FAF8F5',
        },
      },
    },
  },
  plugins: [],
};
