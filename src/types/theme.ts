import { z } from "astro:content";

const NavBarItem = z.object({
  text: z.string(),
  href: z.string().url(),
});
export type NavBarItem = z.infer<typeof NavBarItem>;

export const INavBar = z.object({
  items: z.array(NavBarItem),
});

export const IPage = z.object({
  width: z.object({
    normal: z.string().default("1280px"),
    expand: z.string().default("1536px"),
  }),
});

export const ITheme = z.object({
  siteName: z.string().max(24),
  author: z.string().max(24),
  description: z.string().max(120),
  favicon: z.string(),

  logo: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  navbar: INavBar,
  page: IPage,
});
