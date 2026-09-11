/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      colors: {
        brand: {
          red: '#E31B23',
          green: '#2D7A38',
          dark: '#1A1A1A',
          bg: '#F8F9FA',
        },
      },
    },
  },
  plugins: [],
}
