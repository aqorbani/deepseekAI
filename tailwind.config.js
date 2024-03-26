/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        animateLogo: {
          "0%,10%,100%": {
            width: "0%",
          },
          "70%,80%,90%": {
            width: "100%",
          },
        },
      },
      animation: {
        animateLogo: "animateLogo 6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
