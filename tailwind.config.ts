import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111111',
          green: '#16C784',
          gray: '#333333',
          bg: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", "'Helvetica Neue'", 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
