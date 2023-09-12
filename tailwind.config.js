/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
      'Lobster': ['Lobster', 'cursive'],
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          },
        },
        "fade-in-down": {
          '0%': {
            opacity: '0',
            transform: 'translateY(-15px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        "fade-out-down": {
          'from': {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          'to': {
            opacity: '0',
            transform: 'translateY(15px)'
          },
        },
        "fade-in-right": {
          '0%': {
            opacity: '0',
            transform: 'translateX(15px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(0)'
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.7s ease-in',
        'fade-out-down': 'fade-out-down 0.7s ease-out',
        'fade-in-right': 'fade-in-right 1.5s ease-in',
        'bounce-slow': 'bounce 1s 25s linear',
      },
    },
  },
  plugins: [],
}

