/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#285FF6",
        main: "#002F42",
        red: "#EB6244",
        gray: "#E9F0FB",
        darkGray: "#9CADCE",
        activeLink: "#2DC2D6",
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-in-out",
        popIn: "popIn 0.25s ease-in-out forwards",
        popOff: "popOff 0.25s ease-in-out",
      },
    },
  },
  plugins: [],
};
