module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    scrollbar: ["rounded"]
  },
  theme: {
    screens : {
      print: {'raw': 'print'},
      xxs  : '320px',
      xs   : '470px',
      m_sm : '540px',
      sm   : '600px',
      md   : '800px',
      s_lg : '910px',
      m_lg : '1210px',
      lg   : '1280px',
      xl   : '1440px'
    },
    extend: {
      colors: {
        "parasol": "#170F25",
        "card": "rgba(35,31,56,0.5)",
        "purple-1": "#7939ff",
        "purple-2": "#b064fe"
      },
      boxShadow: {
        "strong": "0 0 1rem rgba(0, 0, 0, .3)",
        "half-strong": "0 0 1rem rgba(0, 0, 0, .1)",
      },

    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
  ],
}
