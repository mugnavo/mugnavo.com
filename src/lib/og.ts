import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

import { Renderer } from "@takumi-rs/core";

import {
  MARK_BASE,
  MARK_D,
  MARK_EDGES,
  MARK_FILLETS,
  MARK_LEFT,
  MARK_RIGHT,
  MARK_SHOULDER,
  MARK_TOP,
  MARK_TRANSFORM,
  MARK_VIEWBOX,
} from "#/lib/mark.ts";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const INK = "#000000";
const CHALK = "#e8e6e0";
const DIM = "#7c7a74";
const GOLD = "#ebd27a";
const GUIDE = "rgb(232 230 224 / 0.13)";
const GUIDE_STRONG = "rgb(232 230 224 / 0.3)";

const PAD = 72;

interface OgImageOptions {
  title: string;
  /** Section shown beside the wordmark, like "Blog" */
  section?: string;
  /** Short detail in the top-right corner, like a post date */
  meta?: string;
}

let renderer: Promise<Renderer> | undefined;

function getRenderer() {
  renderer ??= (async () => {
    const instance = new Renderer();
    // One variable file carries both the weight and width axes the site's type relies on
    const fontPath = createRequire(import.meta.url).resolve(
      "@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
    );
    await instance.registerFont({ name: "Archivo", data: await readFile(fontPath) });
    return instance;
  })();
  return renderer;
}

export async function renderOgImage(options: OgImageOptions) {
  const instance = await getRenderer();
  return instance.render(ogTemplate(options), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    format: "png",
  });
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Long titles step down so they stay within three lines beside the drawing. */
function titleSize(title: string) {
  if (title.length <= 32) return 84;
  if (title.length <= 52) return 66;
  if (title.length <= 80) return 54;
  return 46;
}

/**
 * The hero's construction drawing, laid out in image pixels: full-bleed guides through the mark's
 * edges, its fillet circles, the traced outline, and a short gold run along it.
 */
function drawing({ x, y, scale, quiet }: { x: number; y: number; scale: number; quiet: boolean }) {
  const px = 1 / scale; // one image pixel in mark units
  const line = (x1: number, y1: number, x2: number, y2: number, stroke = GUIDE) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${px}" />`;

  const guides = [
    ...[MARK_TOP, MARK_SHOULDER, MARK_BASE].map((gy) => line(-400, gy, 440, gy)),
    ...[MARK_LEFT, MARK_RIGHT].map((gx) => line(gx, -200, gx, 240)),
    ...MARK_EDGES.map(([ex, ey, dx, dy]) =>
      line(ex - dx * 3, ey - dy * 3, ex + dx * 4, ey + dy * 4),
    ),
    ...MARK_FILLETS.map(
      ([cx, cy, r]) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${GUIDE}" stroke-width="${px}" />`,
    ),
    // Overall dimensions, as on the hero
    line(MARK_LEFT, -4, MARK_RIGHT, -4, GUIDE_STRONG),
    line(MARK_LEFT, -4.7, MARK_LEFT, -3.3, GUIDE_STRONG),
    line(MARK_RIGHT, -4.7, MARK_RIGHT, -3.3, GUIDE_STRONG),
    line(40, MARK_TOP, 40, MARK_BASE, GUIDE_STRONG),
    line(39.3, MARK_TOP, 40.7, MARK_TOP, GUIDE_STRONG),
    line(39.3, MARK_BASE, 40.7, MARK_BASE, GUIDE_STRONG),
  ].join("");

  const outline = `<path d="${MARK_D}" transform="${MARK_TRANSFORM}" fill="none" stroke="${CHALK}" stroke-opacity="${quiet ? 0.45 : 0.85}" stroke-width="${px * 1.25}" />`;
  const gold = `<path d="${MARK_D}" transform="${MARK_TRANSFORM}" fill="none" stroke="${GOLD}" stroke-width="${px * 2.5}" stroke-linecap="round" stroke-dasharray="1.6,38.4" stroke-dashoffset="-6" />`;

  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" style="position:absolute;left:0;top:0">
    <g transform="translate(${x} ${y}) scale(${scale})">${guides}${outline}${gold}</g>
  </svg>`;
}

function ogTemplate({ title, section, meta }: OgImageOptions) {
  const isDefault = !section;
  const size = titleSize(title);
  const narrow = "font-stretch:72%;letter-spacing:0.14em;text-transform:uppercase";

  const wordmark = `<div style="display:flex;align-items:center;gap:14px">
    <svg width="30" height="27" viewBox="${MARK_VIEWBOX}"><path d="${MARK_D}" transform="${MARK_TRANSFORM}" fill="${CHALK}" /></svg>
    <span style="font-size:22px;font-weight:500;font-stretch:125%;letter-spacing:-0.01em;color:${CHALK}">Mugnavo</span>
    ${section ? `<span style="font-size:20px;${narrow};color:${DIM};margin-left:6px">/ ${escapeHtml(section)}</span>` : ""}
  </div>`;

  return `<div style="display:flex;flex-direction:column;justify-content:space-between;position:relative;width:100%;height:100%;padding:${PAD}px;background:${INK};color:${CHALK};font-family:Archivo">
    ${isDefault ? drawing({ x: 780, y: 186, scale: 10, quiet: false }) : drawing({ x: 846, y: 200, scale: 8.8, quiet: true })}

    <div style="display:flex;flex-direction:column;gap:28px;position:relative">
      <div style="display:flex;position:relative;height:1px;background:${GUIDE_STRONG}">
        <div style="position:absolute;left:0;top:0;width:1px;height:14px;background:${GOLD}"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        ${wordmark}
        ${meta ? `<span style="font-size:20px;${narrow};color:${DIM}">${escapeHtml(meta)}</span>` : ""}
      </div>
    </div>

    <div style="display:flex;max-width:740px;font-size:${size}px;line-height:1.02;font-weight:300;font-stretch:125%;letter-spacing:-0.035em">${escapeHtml(title)}</div>
  </div>`;
}
