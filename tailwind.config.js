/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        blush: {
          50: '#fdf4f5',
          100: '#fbe8ea',
          200: '#f7d3d8',
          300: '#f0b0b8',
          400: '#e6808d',
          500: '#d95567',
          600: '#c43a52',
          700: '#a42d43',
          800: '#89273b',
          900: '#742437',
        },
        champagne: {
          50: '#fdfaf5',
          100: '#faf3e7',
          200: '#f5e6cc',
          300: '#edd3a5',
          400: '#e3bb77',
          500: '#d9a453',
          600: '#ca8e3f',
          700: '#a97335',
          800: '#885c30',
          900: '#6f4c2a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
