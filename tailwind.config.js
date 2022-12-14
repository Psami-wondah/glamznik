/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato"],
        poppins: ["Poppins"],
      },
      colors: {
        "jewelry-gold": "#daa520",
      },
    },
  },
  plugins: [],
};
