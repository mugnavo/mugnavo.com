# Agent Guidelines

## Essentials

- Stack: TypeScript + [Astro](https://docs.astro.build) (static output), Tailwind CSS v4, Oxfmt. Package manager: pnpm.
- Pages are `.astro` files rendered to static HTML at build time. Reach for client-side JavaScript only when a page actually needs it, and prefer a small `<script>` in the component over adding a UI framework.
- There is no React (or other framework) integration and no shadcn/ui. Shared UI lives in `src/components/*.astro` (e.g. `Button.astro`). If a genuinely interactive widget needs a framework later, add one with `pnpm astro add <framework>` and hydrate only that component as an island.
- Use `@lucide/astro` for UI icons (use `Icon` suffix, e.g. `import { MenuIcon } from "@lucide/astro"`); for brand icons use `simple-icons` path data (e.g. `siGithub.path`) inside an inline `<svg>`.
- Blog posts are Markdown in `src/content/blog`, defined as a content collection in `src/content.config.ts`.
- SEO meta, canonical URLs and the site-wide JSON-LD live in `src/layouts/BaseLayout.astro`; pages pass `title`, `description` and page-level `structuredData`.
- Keep UI copy user-centered: describe outcomes and next actions concisely without exposing providers, internal states, or implementation details.
- Don't build after every little change. If `pnpm typecheck` passes, assume changes work.

## Code style

- Prefer straightforward solutions for current requirements. Introduce abstractions, generic utilities, extensibility, or architectural layers only when there is a concrete need.
- Keep the main control flow easy to follow. Avoid wrapper layers that merely rename or forward calls and fragmentation that creates unnecessary jumps between files or functions.
- Extract helpers only when they meaningfully improve readability, reuse, or testability.
- Keep types simple and close to where they are used. Prefer inference and avoid type gymnastics unless necessary.
- Be robust at system boundaries such as user input, auth, external APIs, and persistence. Within trusted boundaries, rely on established invariants instead of guarding against hypothetical states.
- Handle edge cases in proportion to their likelihood and impact. Avoid adding complexity for contrived, extremely unlikely, low-impact scenarios outside normal supported use, while preserving applicable security and data-integrity requirements.
- Add concise comments only for non-obvious intent, unusual edge cases, and important constraints. Briefly explain why, not what.

## Topic-specific Guidelines

- [TypeScript conventions](.agents/typescript.md) - Casting rules, prefer type inference
- [Workflow](.agents/workflow.md) - Workflow commands, validation approach
