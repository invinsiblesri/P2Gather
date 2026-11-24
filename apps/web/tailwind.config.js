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
          canvas: '#0A0A0F',
          surface: '#13131A',
          elevated: '#1C1C26',
          glass: 'rgba(19, 19, 26, 0.6)',
        },
        text: {
          primary: '#F0F0F5',
          secondary: '#9898A6',
          muted: '#5C5C6E',
        },
        brand: {
          lime: '#C8E64A',
          indigo: '#6366F1',
          mint: '#10B981',
          violet: '#8B5CF6',
          coral: '#F2674B',
        },
        status: {
          warning: '#F59E0B',
          error: '#EF4444',
          success: '#10B981',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'glass': '20px',
        'card': '16px',
        'button': '12px',
        'pill': '100px',
      },
      backdropBlur: {
        'glass': '24px',
      },
      boxShadow: {
        'glow-lime': '0 0 40px rgba(200, 230, 74, 0.15)',
        'glow-indigo': '0 0 40px rgba(99, 102, 241, 0.15)',
        'glow-mint': '0 0 40px rgba(16, 185, 129, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spin-slow': 'spin 8s linear infinite',
        'equalizer-1': 'equalizer 0.8s ease-in-out infinite',
        'equalizer-2': 'equalizer 0.8s ease-in-out 0.2s infinite',
        'equalizer-3': 'equalizer 0.8s ease-in-out 0.4s infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'equalizer': {
          '0%, 100%': { height: '4px' },
          '50%': { height: '16px' },
        },
      },
    },
  },
  plugins: [],
}
