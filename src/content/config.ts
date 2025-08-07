import { defineCollection, z } from "astro:content";
import { dataFormat } from "@/config";
import dayjs from "dayjs";

// if the content does not meet the build requirements, the build will fail
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    pubDate: z.string().transform((str) => dayjs(str).format(dataFormat)),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
};
