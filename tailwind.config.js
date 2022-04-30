module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  variants: {
    scrollbar: ["rounded"],
  },
  theme: {
    screens: {
      exm: "340px",
      mxm: "600px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        parasol: "#170F25",
        card: "rgba(35,31,56,.7)",
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
