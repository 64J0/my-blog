import type { Element, Root } from "hast";

import { isElement, isParentNode, ParentNode } from "./hastUtils";

function getAlt(img: Element): string | undefined {
  const alt = img.properties?.alt;
  return typeof alt === "string" && alt.length > 0 ? alt : undefined;
}

function walk(node: ParentNode) {
  const children: unknown[] = node.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (isElement(child, "p") && child.children.length === 1 && isElement(child.children[0], "img")) {
      const img = child.children[0];
      const alt = getAlt(img);

      if (alt) {
        children[i] = {
          type: "element",
          tagName: "figure",
          properties: {},
          children: [
            img,
            {
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [{ type: "text", value: alt }],
            },
          ],
        };
      }

      continue;
    }

    if (isParentNode(child)) {
      walk(child);
    }
  }
}

export function rehypeImageCaptions() {
  return (tree: Root) => {
    walk(tree);
  };
}
