module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    scrollbar: ["rounded"],
  },
  theme: {
    extend: {
      colors: {
        parasol: "#170F25",
        card: "rgba(35,31,56,1)",
        "purple-1": "#7939ff",
        "purple-2": "#b064fe",
        "header-color": "#231f38",
      },
      boxShadow: {
        strong: "0 0 1rem rgba(0, 0, 0, .3)",
        "half-strong": "0 0 1rem rgba(0, 0, 0, .1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
  ],
};
