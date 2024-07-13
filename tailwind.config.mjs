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
        "hero-load": "hero-load 1.4s ease-out",
        fade: "fade 1s ease-in",
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
        "hero-load": {
          "0%": {
            opacity: 0.2,
            transform: "translateY(14px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        fade: {
          from: {
            opacity: 0.1,
          },
          to: {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
