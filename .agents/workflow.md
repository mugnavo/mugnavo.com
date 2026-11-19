# Workflow

## Commands

- `pnpm dev`: Astro dev server (http://localhost:4321); runs indefinitely in watch mode
- `pnpm build`: Only for build issues or verifying production output (`dist/`)
- `pnpm typecheck`: `astro check`, type checking `.astro` and `.ts` files (unused locals and parameters are errors)
- `pnpm check`: Format and type check together

Don't build after every change. If the type check passes, assume changes work.

## Testing

No test runner has been set up yet. Prefer type checks for now.

## Formatting

Oxfmt formats everything, including `.astro` files (via `@astrojs/compiler-rs`) and Tailwind class order. Run `pnpm format`. It also runs automatically on commit through Husky and lint-staged, so manual formatting is not necessary.
