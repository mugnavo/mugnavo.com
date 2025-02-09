import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://mugnavo.com",
  integrations: [sitemap(), tailwind({ applyBaseStyles: false }), solid()],
  output: "static",
  adapter: vercel(),
});
