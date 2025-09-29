import presetAttributify from "@unocss/preset-attributify";
import type { Preset } from "unocss";
import { defineConfig, presetTypography, presetWind4 } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify() as Preset,
    presetWind4() as Preset,
    presetTypography({
      // Customize selectors (e.g., target .prose class for markdown)
      selectorName: "prose",
      // Extend CSS with custom styles (e.g., modify headings, links, etc.)
      cssExtend: {
        "h1, h2, h3, h4, h5, h6": {
          margin: "2px",
          position: "relative",
          width: "100%",
          "padding-bottom": "10px",
          "border-bottom": "1px solid rgba(230, 230, 230, 0.911)",
          "--md-after-opacity": "0",
          "scroll-margin-top": "80px", // adjust to nav-bar height + buffer (measure in dev tools)
        },

        ".md-anchor": {
          "text-decoration": "none",
        },

        ".md-anchor::after": {
          content: '"#"',
          "font-weight": "600",
          margin: "10px",
          opacity: "var(--md-after-opacity)",
          transition: "opacity 200ms ease",
        },

        ".md-anchor:hover::after": {
          "--md-after-opacity": "0.2",
        },

        ".md-anchor.active::after": {
          "--md-after-opacity": "0.2",
        },

        ul: {
          "list-style-type": "disc",
          margin: "15px 10px",
        },

        li: {
          margin: "6px 0 6px 0",
        },

        "li a": {
          color: "rgb(54, 151, 231)",
          "text-decoration": "underline",
          "text-underline-offset": "3px",
        },

        p: {
          margin: "15px 5px 25px 5px",
        },

        "p a": {
          color: "rgb(54, 151, 231)",
          "text-decoration": "underline",
          "text-underline-offset": "3px",
        },

        img: {
          margin: "auto",
          "margin-top": "40px",
          "margin-bottom": "40px",
        },
      },
    }) as Preset,
  ],
});
