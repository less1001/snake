/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#0f0f23',
        'game-bg-2': '#1a1a2e',
        'game-bg-3': '#16213e',
        'snake-head': '#00f5ff',
        'snake-body': '#ad7be9',
        'food': '#ffed4e',
      },
      animation: {
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'title-glow': 'title-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 15px rgba(255, 237, 78, 0.3)'
          },
          '50%': { 
            transform: 'scale(1.1)',
            boxShadow: '0 0 25px rgba(255, 237, 78, 0.6)'
          }
        },
        'title-glow': {
          '0%': { textShadow: '0 0 30px rgba(0, 245, 255, 0.3)' },
          '100%': { textShadow: '0 0 50px rgba(0, 245, 255, 0.6), 0 0 80px rgba(173, 123, 233, 0.3)' }
        }
      }
    },
  },
  plugins: [],
}