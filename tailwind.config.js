/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(58 54 219)',
        secondary: 'rgb(0 128 128)',
        light: 'rgb(241 244 249)',
        dark: 'rgb(43 44 46)',
        info: 'rgb(59 130 246)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
