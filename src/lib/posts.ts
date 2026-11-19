import { getCollection } from "astro:content";

export async function getPostsNewestFirst() {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Post dates are authored as calendar days, so format in UTC to keep output stable across zones. */
export function formatPostDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
