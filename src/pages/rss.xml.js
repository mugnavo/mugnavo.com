import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: blog.map((post) => ({
      ...post.data,
      link: `/blog/${post.id.split("/").pop()}/`,
    })),
  });
}
