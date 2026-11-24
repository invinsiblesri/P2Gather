/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          canvas: '#0F1115',
          surface: '#181B22',
          elevated: '#20242D',
        },
        text: {
          primary: '#F3F4F6',
          secondary: '#9CA3AF',
          muted: '#667085',
        },
        brand: {
          indigo: '#6366F1',
          mint: '#10B981',
        },
        status: {
          warning: '#F59E0B',
          error: '#EF4444',
        },
        landing: {
          bg: '#0A0C10',
          glow: {
            blue: '#2563EB',
            coral: '#F2674B',
          }
        }
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'button': '11px',
      }
    },
  },
  plugins: [],
}
