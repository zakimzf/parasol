module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    scrollbar: ["rounded"]
  },
  theme: {
    extend: {
      colors: {
        "parasol": "#170F25",
        "purple-1": "#7939ff",
        "purple-2": "#b064fe"
      },
      boxShadow: {
        "strong": "0 0 1rem rgba(0, 0, 0, .3)",
        "half-strong": "0 0 1rem rgba(0, 0, 0, .1)",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
}
