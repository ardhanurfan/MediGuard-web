/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { poppins: ["Poppins", "sans-serif", "system-ui"] },
      colors: {
        kBlue: {
          100: "#D2E9F8",
          200: "#33BDFE",
          300: "#015AAB",
          400: "#0F2341",
        },
        kGreen: {
          100: "#F3F2E0",
          200: "#3DD598",
          300: "#4D9A55",
        },
        kYellow: "#FFAE06",
        kRed: "#FF4329",
        disable: "#ACACAC",
        kGrey: "#6A6A6A",
        kHeadTable: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
