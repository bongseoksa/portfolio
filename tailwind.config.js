/** @type {import('tailwindcss').Config} */
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss'), require('autoprefixer')]
}
