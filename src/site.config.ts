import { z } from "astro:content";
import { ITheme } from "@/types";

type ThemeConfig = z.infer<typeof ITheme>;

export const dataFormat = "MMM DD, YYYY";

export const theme: ThemeConfig = {
  // === Basic configuration ===
  /** SiteName for your website. Will be used in metadata and as browser tab title. */
  siteName: "HITSZ 自动化课程攻略共享计划",
  /** Will be used in index page & copyright declaration */
  author: "HITSZ OpenAuto",
  /** Description metadata for your website. Can be used in page metadata. */
  description: "由 HITSZ OpenAuto 维护，为 HITSZ 学子提供课程攻略共享服务",
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: "/favicon/favicon.ico",

  /** Set a logo image to show in the homepage. */
  logo: {
    src: "src/assets/avatar.png",
    alt: "Avatar",
  },

  navbar: {
    items: [
      { text: "文档", href: "/docs" },
      { text: "博客", href: "/blog" },
      { text: "新闻", href: "/news" },
      { text: "友链", href: "/links" },
      { text: "关于", href: "/about" },
    ],
  },

  page: {
    width: {
      normal: "1280px",
      expand: "1536px",
    },
  },
};
