import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";

import { renderOgImage } from "#/lib/og.ts";
import { formatPostDate, getPostsNewestFirst } from "#/lib/posts.ts";

// Social preview images, rendered at build time. Pages point at theirs through BaseLayout's
// `image` prop; anything without one uses /og/default.png.
export const getStaticPaths = (async () => {
  const posts = await getPostsNewestFirst();
  return [
    { params: { slug: "default" }, props: { title: "Web products, built with care." } },
    {
      params: { slug: "work" },
      props: { section: "Work", title: "Products we've designed and built." },
    },
    {
      params: { slug: "services" },
      props: { section: "Services", title: "What we design and build." },
    },
    {
      params: { slug: "blog" },
      props: { section: "Blog", title: "Notes on building for the web." },
    },
    {
      params: { slug: "contact" },
      props: { section: "Contact", title: "Tell us what you're building." },
    },
    ...posts.map((post) => ({
      params: { slug: `blog/${post.id}` },
      props: { section: "Blog", meta: formatPostDate(post.data.pubDate), title: post.data.title },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute<InferGetStaticPropsType<typeof getStaticPaths>> = async ({ props }) => {
  const png = await renderOgImage(props);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
