// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), react()],
  site: "https://hoa.moe",
  trailingSlash: "always",
});
