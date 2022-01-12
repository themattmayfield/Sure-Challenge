module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sureGray: "#16181C",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
