import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://tolbertrestaurant.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    react(),
  ],
  buildOptions: {
    rollupOptions: {
      external: ["@/components/Hero", "@/components/Calendar"],
    },
  },
});
