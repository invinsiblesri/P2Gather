/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#02060E',
          900: '#060D18',
          850: '#0B1524',
          800: '#111E30',
        },
        bone: {
          50: '#F8FAFF',
          100: '#EFF3FF',
          200: '#D8E0F0',
          300: '#B0BAD0',
          400: '#8892A8',
          500: '#606A80',
        },
        hot: '#FF6B35',
        electric: '#0066FF',
        edge: 'rgba(248, 250, 255, 0.07)',
        'edge-hi': 'rgba(248, 250, 255, 0.14)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        'spot': '16px',
      },
      animation: {
        'blink': 'blink 1.15s step-end infinite',
        'bar-1': 'bar 1s ease-in-out infinite alternate',
        'bar-2': 'bar 0.8s ease-in-out 0.15s infinite alternate',
        'bar-3': 'bar 1.2s ease-in-out 0.3s infinite alternate',
        'bar-4': 'bar 0.9s ease-in-out 0.1s infinite alternate',
        'bar-5': 'bar 1.1s ease-in-out 0.25s infinite alternate',
        'sweep': 'sweep-y 3s linear infinite',
        'swap-in': 'swap-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        blink: {
          '0%, 45%': { opacity: '1' },
          '55%, 100%': { opacity: '0' },
        },
        bar: {
          '0%': { transform: 'scaleY(0.2)' },
          '100%': { transform: 'scaleY(1)' },
        },
        'sweep-y': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'swap-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
    },
  },
  plugins: [],
}
