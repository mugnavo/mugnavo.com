import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      touch: {
        raw: "(pointer: coarse)",
      },
      xs: "380px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#f5dc78",
        // TODO: variant for light bg, and full color scheme
      },
      fontFamily: {
        main: ["Outfit", "sans-serif"],
      },
      animation: {
        dash: "dash 24s linear infinite",
        dashgold: "dashgold 42s linear infinite",
      },
      keyframes: {
        dash: {
          from: {
            "stroke-dashoffset": 0,
          },
          to: {
            "stroke-dashoffset": 16, // double the stroke-dasharray
          },
        },
        dashgold: {
          from: {
            "stroke-dashoffset": 0,
          },
          to: {
            "stroke-dashoffset": 80, // double the stroke-dasharray
          },
        },
      },
    },
  },
  plugins: [],
};
