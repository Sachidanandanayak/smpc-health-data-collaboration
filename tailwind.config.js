/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.vite.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050816',
          100: '#0B1120',
          200: '#111827',
        },
        primary: '#00F5FF',
        secondary: '#8B5CF6',
        accent: '#3B82F6',
      },
    },
  },
  plugins: [],
}
