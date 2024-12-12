import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { sitemapFix } from "./temp-sitemap-fix";

// https://astro.build/config
export default defineConfig({
  site: "https://mugnavo.com",
  integrations: [
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    solid(),
    sitemapFix(), // TODO: temporary fix: https://github.com/withastro/adapters/issues/445#issuecomment-2526327882
  ],
  output: "static",
  adapter: vercel(),
});
