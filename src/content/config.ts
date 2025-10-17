import { defineCollection, z } from "astro:content";
import { dataFormat } from "@/config";
import { file } from "astro/loaders";
import dayjs from "dayjs";

import {
  courseMetadata,
  nationalMajor as nationalMajorSchema,
  schoolMajor as schoolMajorSchema,
} from "@/types/metadata.ts";

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

const course = defineCollection({
  schema: z.object({
    title: z.string(),
    weight: z.number().int(),
    editURL: z.string().url().optional(),
    updateInfo: z
      .object({
        date: z.string().transform((str) => dayjs(str).format(dataFormat)),
        author: z.string(),
        message: z.string(),
      })
      .optional(),
    metadata: courseMetadata,
  }),
});

const nationalMajor = defineCollection({
  loader: file("src/data/national-major.json"),
  schema: nationalMajorSchema,
});

const schoolMajor = defineCollection({
  loader: file("src/data/school-major.json"),
  schema: schoolMajorSchema,
});

export const collections = {
  blog,
  course,
  nationalMajor,
  schoolMajor,
};
