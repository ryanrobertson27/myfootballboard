/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'texas-orange': '#bf5700',
        'texas-dark-gray': '#333f48',
        'texas-light-gray': '#9cadb7',
        'texas-white': '#ffffff',
        'texas-black': '#000000',
        'texas-dark-blue': '#005f86',
        'texas-cream': '#d6d2c4',
      },
    },
  },
  plugins: [],
};
