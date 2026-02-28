import { glob } from "astro/loaders";
import * as z from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    author: z.object({
      name: z.string(),
      avatar: z.string().optional(),
      url: z.string().optional(),
    }),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
