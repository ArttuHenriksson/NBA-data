/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto'],
      },
      colors: {
        nba_blue: '#17408b',
        nba_red: '#c9082a',
        nba_white: '#ffffff',
      },
    },
  },
  plugins: [],
};
