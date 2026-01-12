/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/tw-elements/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tw-elements/plugin.cjs')],
};
