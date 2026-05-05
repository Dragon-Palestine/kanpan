/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: ["w-64", "w-sidebar"],
  theme: {
    extend: {
      colors: {
        "light-bg": "#F8FAFC",
      },
      width: {
        sidebar: "16rem",
      },
    },
  },
  plugins: [],
};
