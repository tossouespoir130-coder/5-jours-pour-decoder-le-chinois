/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0D0D12',
          deep: '#07070A',
          card: '#13131A',
          surface: '#1A1A24',
          border: 'rgba(201, 168, 76, 0.15)',
        },
        champagne: {
          DEFAULT: '#C9A84C',
          light: '#E2C872',
          dark: '#9A7E30',
          glow: 'rgba(201, 168, 76, 0.25)',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          muted: '#D8D4CC',
        },
        slate: {
          DEFAULT: '#2A2A35',
          dark: '#1C1C26',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
