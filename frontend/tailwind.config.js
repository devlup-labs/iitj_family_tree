// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        movedown: {
          '0%': { transform: 'translateY(-400px)' },
          '60%': { transform: 'translateY(100px)' },
          '100%': { transform: 'translateY(0)' }
        },
        moveup: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-400px)' }
        }
      },
      animation: {
        'movedown': 'movedown 1s forwards',
        'moveup': 'moveup 1s forwards'
      }
    },
  },
  plugins: [],
};