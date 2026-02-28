import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import expressiveCode from "astro-expressive-code";

import tailwindcss from "@tailwindcss/vite";

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
    expressiveCode({
      themes: ["dark-plus"],
      plugins: [pluginCollapsibleSections()],
    }),
    mdx(),
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
      cssVariable: "--font-sans",
      fallbacks: ["sans-serif"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
});
