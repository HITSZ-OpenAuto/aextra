import { defineCollection, z } from "astro:content";
import { dataFormat } from "@/config";
import dayjs from "dayjs";

// if the content does not meet the build requirements, the build will fail
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform((str) => dayjs(str).format(dataFormat)),
    authors: z
      .array(
        z.object({
          name: z.string(),
          link: z.string().url().optional(),
          image: z.string().url().optional(),
        }),
      )
      .optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const about = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blog,
  about,
};
