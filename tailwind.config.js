const { purple, blue } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {

    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      "light",
      {
        mytheme: {
          purple: purple[200],
          blue: blue[200],
  
        },
      },
    ],
    base: true,
    darkTheme: "dark"
  }
}
