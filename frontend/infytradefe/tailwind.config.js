/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0D6EFD", // Example primary color
          secondary: "#6C757D", // Example secondary color
          accent: "#F5F5F5", // Example accent color
          neutral: "#ffffff", // White background color
          "base-100": "#ffffff", // White base color
        },
      },
    ],
    darkTheme: "dark",
  },
};