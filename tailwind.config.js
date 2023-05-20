/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1773B0",
        "second": "#1B262C",
        "third": "#9E9E9E",
        "fourth": "#D9D9D9",
        "fifth": "#6D6B6B",
        "sixth": "#8CB8D4",
        "seventh": "#B9BBBA",
        "eighth": "#262727",
        "ninth": "#97B3DD",
        "tenth": "#B9BBBA",
        "eleventh": "#474747",
      },
    },
    plugins: [
      require('tailwind-scrollbar-hide')
    ],
  }
}

