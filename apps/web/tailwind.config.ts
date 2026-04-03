import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FAFAF8',
        'warm-cream': '#F0EDE4',
        'warm-border': '#E5E3DC',
        'charcoal': '#1A1A1A',
        'charcoal-muted': '#6B6B6B',
        'charcoal-light': '#9B9B9B',
        'gold': '#C9A84C',
        'gold-hover': '#B8962B',
        'gold-light': '#E8D5A3',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

export default config
