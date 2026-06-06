/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#080B0F",
          cyan: "#00D4FF",
          violet: "#7C3AED",
          red: "#FF4560",
          amber: "#F59E0B",
          gray: "#E2E8F0",
          darkGray: "#1E293B",
        }
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
