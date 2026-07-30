import type { Root } from "hast";
import { toString } from "hast-util-to-string";

import { isElementNode, isParentNode, ParentNode } from "./hastUtils";
import { TocEntry } from "../types/posts";

const HEADING_TAGS = new Set(["h2", "h3"]);

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function uniqueSlug(text: string, usedSlugs: Map<string, number>): string {
  const base = slugify(text) || "section";
  const count = usedSlugs.get(base) ?? 0;
  usedSlugs.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

function walk(node: ParentNode, entries: TocEntry[], usedSlugs: Map<string, number>) {
  for (const child of node.children) {
    if (isElementNode(child) && HEADING_TAGS.has(child.tagName)) {
      const text = toString(child);
      const id = uniqueSlug(text, usedSlugs);

      child.properties = { ...child.properties, id };
      entries.push({ id, text, depth: Number(child.tagName[1]) });
    }

    if (isParentNode(child)) {
      walk(child, entries, usedSlugs);
    }
  }
}

// Mutates the given `entries` array as a side effect (unified transformers
// don't return data), so callers pass in the array they want populated.
export function rehypeTableOfContents(entries: TocEntry[]) {
  return (tree: Root) => {
    walk(tree, entries, new Map());
  };
}
