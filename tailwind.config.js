export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
// frontend/tailwind.config.js

theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
    colors: {
      sand: '#e4c7a1',
      rose: '#ed539f',
      dark: '#2e2e2e',
    },
  },
}
,
  plugins: []
}
