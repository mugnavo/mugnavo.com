export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    if (request.headers.get("Content-Type") !== "application/json") {
      return new Response("Invalid request", { status: 400 });
    }

    const msg = (await request.json()) as {
      name?: string;
      email?: string;
      text?: string;
    };
    if (!msg || !msg.text || !msg.name || !msg.email) {
      return new Response("Invalid request body", { status: 400 });
    }

    const res = await fetch(import.meta.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: msg.name,
            description: msg.text,
            footer: {
              text: msg.email,
            },
          },
        ],
      }),
    });

    if (res && res.ok) {
      return new Response("Sent!", { status: 200 });
    }
    return new Response("Message not sent", { status: 500 });
  } catch (err) {
    console.error(err);
    return new Response("Internal server error", { status: 500 });
  }
};
