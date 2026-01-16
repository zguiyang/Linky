/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/views/**/*.edge', './inertia/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Public Sans',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          'start': '#6366f1',
          'end': '#ec4899',
          'bg': 'rgba(99, 102, 241, 0.1)',
          'bg-hover': 'rgba(99, 102, 241, 0.2)',
          'light': '#818cf8',
          'border': 'rgba(99, 102, 241, 0.2)',
          'border-active': 'rgba(99, 102, 241, 0.4)',
        },
        gold: {
          DEFAULT: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.3)',
        },
        glass: {
          'bg': 'rgba(255, 255, 255, 0.7)',
          'bg-heavy': 'rgba(255, 255, 255, 0.95)',
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'button': '0 4px 12px rgba(99, 102, 241, 0.3)',
        'button-hover': '0 8px 24px rgba(99, 102, 241, 0.4)',
        'modal': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
