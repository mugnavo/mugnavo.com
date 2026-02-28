import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: blog.map((post) => ({
      ...post.data,
      author: post.data.author.name,
      link: `/blog/${post.id.split("/").pop()}/`,
    })),
  });
};
