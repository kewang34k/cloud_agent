/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Jost', 'Noto Sans SC', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Noto Serif SC', 'serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#F5F5DC', // Beige
        accent: '#1E3A8A', // Dark blue
        surface: '#FAFAFA',
      }
    },
  },
  plugins: [],
};
