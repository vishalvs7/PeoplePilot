/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary colors - use these with bg-primary, text-primary, etc.
        'primary': '#19A800',
        'primary-dark': '#148000',
        'primary-light': '#4cff33',
        
        // Brand colors with shades - use with bg-brand-500, text-brand-300, etc.
        'brand': {
          50: '#f0fdf0',
          100: '#dcfcdc',
          200: '#bbf7bb',
          300: '#86ef86',
          400: '#4cff33',
          500: '#19A800',
          600: '#148000',
          700: '#0f6600',
          800: '#0a4d00',
          900: '#053300',
        }
      },
    },
  },
  plugins: [],
}