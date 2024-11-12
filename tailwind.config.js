/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#013FE0",
        "main-fg": "#2E0C77FF",
        "delete": "#F8546A",
        "delete-hover": "#EE344D",
        "success": "#4BCF4B",
        "warning": "#ffcc00",
        "error": "#F8546A",
        "info": "#5D65FF",
      },
    },
  },
  plugins: [],
}
