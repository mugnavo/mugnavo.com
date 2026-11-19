---
title: "Betting on TanStack Start"
pubDate: "2026-11-19"
description: "We tried TanStack Start in its first public alpha and committed to it once it reached beta. Now that it's stable, here's why we're still betting on it."
author:
  name: "nize"
  url: "https://nize.ph"
---

In August 2024, TanStack Start had just come out as an early alpha. We started tinkering with it right away, and published the starter we built along the way. When Start entered beta at the end of that year, it became our default for new web apps. Start has since reached 1.0 stable, and we never switched away.

That starter is now the [Cove Stack](https://cove.mugnavo.com/). It has 1,400+ stars on GitHub and still powers how we start new web apps today. This post explains why we made that bet, what it actually cost us, and why we'd make it again.

## What we were looking for

Most of what we build for clients and for ourselves is the same shape: a web app with accounts, a database, and screens that move data between the two. For that kind of work we wanted a framework that:

- catches mistakes at compile time, not in production, across routes, URLs, and the client–server boundary
- stays close to the platform and to plain React, so what we learn isn't trapped in one framework's conventions
- deploys anywhere, without the framework nudging us toward a particular host
- doesn't make us relearn React to use it

Next.js was the obvious default. It's a good framework, and plenty of great products run on it. But its App Router is built around React Server Components and its own caching rules, and for the kind of interactive apps we build, we kept spending time working around the model instead of with it.

## Why TanStack

We were already using TanStack Query in nearly every project, and TanStack Router had quietly become the most thoroughly type-safe router in React. Start was the natural next step: the same router, with server rendering and server functions added on top.

### The router is the contract

In TanStack Router, routes, path params, and search params are all typed, and search params are validated like any other input. Link to a page that doesn't exist, or forget a required param, and the editor tells you before the app runs. In apps with dozens of screens and filters that live in the URL, this is the single feature we'd miss most.

### Server functions without the magic

A server function in Start is a typed function that runs on the server and can be called from anywhere in the app. Middleware composes onto it, so things like authentication are explicit and visible where they're used:

```ts
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "#/lib/auth/middleware.ts";
import { db } from "#/lib/db/index.ts";

export const getProjects = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    // context.user is typed, and guaranteed to exist here
    return db.query.projects.findMany({
      where: { ownerId: context.user.id },
    });
  });
```

No directives to remember and no caching layer to reason about. Data fetching on the client goes through TanStack Query, which we already knew well.

### It's just Vite

Start is a Vite plugin. Builds, dev server, and the plugin ecosystem are all standard Vite, and deployment goes through [Nitro](https://nitro.build/), which ships presets for Netlify, Vercel, Cloudflare, plain Node, and more. Moving a project between hosts is a config change, not a migration.

## What the bet cost

Betting on a beta isn't free, and it would be dishonest to pretend otherwise. Breaking changes came regularly, and the biggest one rebuilt Start's foundation: in 2025 it dropped Vinxi, the layer it was originally built on, and became a plain Vite plugin. Every project had to move. If you need a framework you can set up once and leave untouched for two years, an early-stage one isn't it.

What made it worth it: the changes kept making Start simpler. Dropping Vinxi made it more standard, not less. The release candidate in September 2025 settled the core APIs, and on October 13, 2026, [Start reached 1.0](https://tanstack.com/blog/tanstack-start-1-0), with the TanStack team making a formal commitment to those APIs. The early churn is behind it.

## How the Cove Stack came out of it

We published the starter early, mostly for ourselves: a clean base with auth, a database, and a UI kit already wired together, so a new project could skip the first week of setup.

It turned out other people wanted the same thing. The template, first released as TanStarter, picked up stars steadily and started getting recommended in community lists and articles.

In September 2026 we [renamed it to the Cove Stack](https://github.com/mugnavo/cove/issues/96). "TanStarter" was a mashup of "TanStack" and "starter", and the name had started to collide with an unrelated commercial boilerplate. A cove is a calm, sheltered place by the water, a nod to TanStack's beach-and-vacation feel and a good place to start building.

### What's in it

- [TanStack Start](https://tanstack.com/start/latest), Router, and Query, on React
- [Better Auth](https://better-auth.com/) for accounts and sessions
- [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL
- Tailwind CSS with [shadcn/ui](https://ui.shadcn.com/) on Base UI
- [Vite+](https://viteplus.dev/) for the toolchain and Nitro for deployment
- Typed, validated environment variables with [Varlock](https://varlock.dev/), and structured logging with [evlog](https://www.evlog.dev/)

What's deliberately not in it: payments, email, a CMS, admin panels, or anything else you'd end up deleting. The goal is a foundation, not a product. There's also a [monorepo version](https://github.com/mugnavo/cove-monorepo) for projects that need to split into packages.

It's released into the public domain under the Unlicense. No attribution needed, no paid tier, now or later.

## Why we're still betting on it

Now that it's stable, TanStack Start is what we reach for whenever we build a web app. The type safety pays for itself on every project, the Vite foundation means we're never stuck waiting on the framework for tooling, and the TanStack team has a long record of maintaining libraries for years.

It isn't what we use for everything. This site, for example, is mostly static content, so it runs on [Astro](https://astro.build/). Choosing the right tool for each job is part of the work.

But for apps, we're all in. If you want to try the same foundation, start a project with:

```bash
pnpm create cove
```

Or browse the [source on GitHub](https://github.com/mugnavo/cove). And if you'd rather have us build it with you, [tell us what you're building](/contact/).
