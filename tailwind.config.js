/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vector-red': '#FF0000',
        'vector-green': '#00FF00',
        'vector-yellow': '#FFFF00',
      },
      fontFamily: {
        'retro': ['monospace'],
      },
    },
  },
  plugins: [],
}
