import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import type { Root } from "hast";

import { isElement, isParentNode, ParentNode } from "./hastUtils";

// Mirrors Next.js's default device/imageSizes breakpoints closely enough for
// blog post images, which are all served from /public.
const WIDTHS = [640, 828, 1200, 1920];
const QUALITY = 75;
const publicDirectory = path.join(process.cwd(), "public");

// Only ever returns widths from `availableWidths`: Next's built-in image
// optimizer 400s on any "w" value that isn't one of its configured
// deviceSizes/imageSizes, so an image's own natural width (almost never an
// exact match) can't be requested directly. If the image is narrower than
// every breakpoint, the smallest one is still returned — Next serves it at
// native resolution without upscaling.
export function selectWidths(naturalWidth: number, availableWidths: number[]): number[] {
  const applicable = availableWidths.filter((width) => width <= naturalWidth);
  return applicable.length > 0 ? applicable : [availableWidths[0]];
}

function buildOptimizedUrl(src: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}`;
}

function readDimensions(src: string): { width: number; height: number } | null {
  const filePath = path.join(publicDirectory, src);
  if (!filePath.startsWith(publicDirectory) || !fs.existsSync(filePath)) {
    return null;
  }

  try {
    const { width, height } = imageSize(fs.readFileSync(filePath));
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}

function walk(node: ParentNode) {
  for (const child of node.children) {
    if (isElement(child, "img")) {
      const src = child.properties?.src;

      if (typeof src === "string" && src.startsWith("/") && !src.startsWith("//")) {
        const dimensions = readDimensions(src);

        if (dimensions) {
          // Next's built-in image optimizer refuses to serve SVGs by
          // default (dangerouslyAllowSVG), so only set width/height on
          // those to avoid layout shift, without routing through it.
          if (src.toLowerCase().endsWith(".svg")) {
            child.properties = {
              ...child.properties,
              width: dimensions.width,
              height: dimensions.height,
            };
          } else {
            const widths = selectWidths(dimensions.width, WIDTHS);
            const srcSet = widths.map((width) => `${buildOptimizedUrl(src, width)} ${width}w`).join(", ");
            const fallbackWidth = widths[widths.length - 1];

            child.properties = {
              ...child.properties,
              src: buildOptimizedUrl(src, fallbackWidth),
              srcSet,
              sizes: "(min-width: 68rem) 64rem, 100vw",
              width: dimensions.width,
              height: dimensions.height,
              loading: "lazy",
              decoding: "async",
            };
          }
        }
      }
    }

    if (isParentNode(child)) {
      walk(child);
    }
  }
}

export function rehypeOptimizeImages() {
  return (tree: Root) => {
    walk(tree);
  };
}
