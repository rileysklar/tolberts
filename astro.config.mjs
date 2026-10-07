import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// Routes that must never appear in the sitemap: they either redirect
// elsewhere or are already marked `noindex` in their page/layout.
const excludedFromSitemap = ["/menu", "/brunch-menu", "/404"];

// https://astro.build/config
export default defineConfig({
  site: "https://tolbertsrestaurant.com",
  trailingSlash: "always",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !excludedFromSitemap.includes(pathname.replace(/\/$/, ""));
      },
    }),
    react(),
  ],
  adapter: netlify(),
});
