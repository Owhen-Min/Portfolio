/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  corePlugins: {
    preflight: true,
  },
  important: true,
  theme: {
    extend: {
      // 스크롤바 숨김 설정
      scrollbar: ["none"],
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            h1: {
              marginTop: "1.5em",
            },
            pre: {
              padding: 0,
              backgroundColor: "transparent",
            },
            "pre code": {
              padding: 0,
              backgroundColor: "transparent",
            },
            code: {
              fontWeight: "400",
            },
            a: {
              color: theme("colors.blue.600"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.300"),
              },
            },
          },
        },
      }),
    },
  },
};
