/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        heading: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          yellow: '#F2EA79',
          gold: '#D9981E',
          bronze: '#A67E33',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #F2EA79 0%, #D9981E 50%, #A67E33 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(242, 234, 121, 0.1) 0%, rgba(217, 152, 30, 0.1) 50%, rgba(166, 126, 51, 0.1) 100%)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'border-rotate': 'borderRotate 3s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '200% 0',
          },
          '50%': {
            'background-position': '0 0',
          },
        },
        borderRotate: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
};

