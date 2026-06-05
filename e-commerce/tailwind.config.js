/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        gold: '#b9853a',
        'gold-strong': '#8e6429',
        green: '#143d38',
        blue: '#17364a',
        rose: '#8c4e54',
        ink: '#151515',
        muted: '#6f6960',
        line: '#e4d8c7',
      },
      boxShadow: {
        brand: '0 24px 70px rgba(31, 25, 18, 0.12)',
      },
      borderRadius: {
        brand: '8px',
      },
    },
  },
  plugins: [],
}
