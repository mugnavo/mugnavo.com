import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://mugnavo.com",
  integrations: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              target: "19",
            },
          ],
        ],
      },
    }),
    sitemap(),
  ],
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Poppins",
      cssVariable: "--font-primary",
      fallbacks: ["sans-serif"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
});
