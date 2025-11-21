/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          amber: '#ffbf00'
        }
      },
      fontFamily: {
        mono: ['Courier New', 'ui-monospace', 'SFMono-Regular']
      }
    }
  },
  plugins: []
}
