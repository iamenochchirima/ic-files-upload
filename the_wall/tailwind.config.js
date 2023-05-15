/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#37B068",
        secondary: "rgba(150, 150, 150, 0.38)",
        productBg: "rgba(74, 156, 128, 0.23)",
      },
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        interNormal: ["inter-medium", "sans-serif"],
        interBold: ["inter-bold", "sans-serif"],
        interExtraBold: ["inter-extrabold", "sans-serif"],
        interThin: ["inter-thin", "sans-serif"],
        interMedium: ["inter-medium", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
};
