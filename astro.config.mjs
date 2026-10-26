import { defineConfig, envField } from "astro/config";
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
  // Server secrets are read at runtime through `astro:env` instead of being
  // inlined into the build output by `import.meta.env`.
  env: {
    schema: {
      WORDPRESS_API_URL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      WORDPRESS_URL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      WORDPRESS_USER: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      WORDPRESS_PASSWORD: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      WORDPRESS_AUTH_REFRESH_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
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
