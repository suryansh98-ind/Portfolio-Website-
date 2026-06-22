/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        blue: {
          DEFAULT: '#60A5FA',
          mid: '#3B82F6',
          dark: '#2563EB',
          dim: 'rgba(96, 165, 250, 0.12)',
          border: 'rgba(96, 165, 250, 0.25)',
        },
      },
      boxShadow: {
        'card-dark': '0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)',
        'card-light': '0 0 0 1px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)',
        glow: '0 0 40px rgba(96, 165, 250, 0.20)',
      },
    },
  },
  plugins: [],
}
