// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: "https://hoa.moe",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append", // or 'prepend' / 'append'
          properties: {
            class:
              "anchor-link no-underline text-inherit opacity-0 transition-all duration-300 ml-1 before:content-['#']",
          },
        },
      ],
    ],
  },
});
