/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'dark', // Або повністю видаліть цей рядок, тоді Tailwind не буде генерувати dark: варіанти
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}