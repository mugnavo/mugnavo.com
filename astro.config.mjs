import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://mugnavo.com",
  integrations: [sitemap(), solid()],
  output: "static",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Poppins",
        cssVariable: "--font-poppins",
        fallbacks: ["sans-serif"],
        styles: ["normal"],
        subsets: ["latin"],
      },
    ],
  },
});
