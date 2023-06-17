/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",

      "almost-white": "#fefefe",
      "ghost-white": "#f6f8ff",
      azure: "#0079ff",
      gray: "#697c9a",
      blue: "#4b6a9b",
      "dark-blue": "#222731",
      gunmetal: "#2b3442",
      "dark-gunmetal": "#141d2f",
      "yankees-blue": "#1e2a47",
      "ceil-blue": "#90a4d4",
      "blue-jeans": "#60abff",
    },
    fontFamily: {
      sans: ["Space Mono", "sans-serif"],
    },
    screens: {
      tablet: "768px",
      desktop: "1440px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
