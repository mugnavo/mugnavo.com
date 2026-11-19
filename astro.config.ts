import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

import { SITE_URL } from "./src/lib/consts.ts";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [sitemap()],
  markdown: {
    // Near-black and mostly monochrome, with a warm accent that sits close to the site's gold
    shikiConfig: { theme: "vesper" },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-archivo",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
      // The `type-wide` and `type-narrow` utilities rely on Archivo's width axis, which Google only
      // serves when asked for
      options: { experimental: { variableAxis: { wdth: [["62", "125"]] } } },
    },
  ],
});
