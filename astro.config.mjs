import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://mugnavo.com",
  integrations: [sitemap()],
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
