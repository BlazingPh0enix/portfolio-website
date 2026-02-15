/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
        },
        neon: {
          cyan: '#00f3ff',
          purple: '#bc13fe',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', '"Courier New"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f3ff, 0 0 20px rgba(0, 243, 255, 0.3)',
        'neon-purple': '0 0 5px #bc13fe, 0 0 20px rgba(188, 19, 254, 0.3)',
        'neon-cyan-lg': '0 0 10px #00f3ff, 0 0 40px rgba(0, 243, 255, 0.4), 0 0 80px rgba(0, 243, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
      },
      keyframes: {
        gridScroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        }
      }
    }
  },
  plugins: []
}
