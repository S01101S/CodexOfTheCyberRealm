// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gowun-dodum': ['"Gowun Dodum"', 'sans-serif'],
        'orbitron': ['"Orbitron"', 'sans-serif'],
        'courier': ['"Courier New"', 'Courier', 'monospace'],
      },
      colors: {
        'custom-bg': 'rgb(142, 131, 139)',
        'header-bg': 'rgb(96, 88, 94)',
        'status-bar-bg': 'rgb(128, 120, 126)',
        'modal-bg': 'rgba(2, 35, 85, 0.4)',
        'modal-border': 'rgba(2, 35, 85, 0.7)',
        'gradient-start': 'rgba(120, 20, 180, 0.9)',
        'gradient-end': 'rgba(20, 10, 30, 0.9)',
      },
      animation: {
        'glow': 'glow 1s ease-in-out infinite alternate',
        'glow-button': 'glowButton 1s ease-in-out infinite alternate',
        'glow-typewriter': 'glowTypeWriter 1.5s ease-in-out infinite alternate',
        'move-circuits': 'moveCircuits 25s infinite linear',
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 5px #fff' },
          'to': { textShadow: '0 0 5px #fff, 0 0 10px lightblue' },
        },
        glowButton: {
            'from': { textShadow: '0 0 5px #e600ff' },
            'to': { textShadow: '0 0 5px #38004a, 0 0 10px rgb(116, 3, 176)' },
        },
        glowTypeWriter: {
          'from': { textShadow: '0 0 5px #e0ffff, 0 0 10px #e0ffff, 0 0 15px #00ffff' },
          'to': { textShadow: '0 0 10px #e0ffff, 0 0 20px #00ffff, 0 0 25px #00ffff' },
        },
        moveCircuits: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-304px -304px' },
        }
      }
    },
  },
  plugins: [],
}