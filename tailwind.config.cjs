/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#516f56",
          50: "#f3f7f4",
          100: "#e3ede6",
          200: "#c7dacd",
          300: "#a3c1ad",
          400: "#7ea58d",
          500: "#5f8a70",
          600: "#516f56",
          700: "#425a46",
          800: "#334437",
          900: "#263329",
        },
        ink: {
          50: "#f7f8f8",
          100: "#eef1f0",
          200: "#dde3e1",
          300: "#c6d0cd",
          400: "#9aa7a3",
          500: "#6f7d79",
          600: "#55635f",
          700: "#3f4b48",
          800: "#2b3432",
          900: "#1c2322",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
