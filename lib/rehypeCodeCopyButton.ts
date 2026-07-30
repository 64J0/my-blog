import type { Element, Root } from "hast";

import { hasClass, isElement, isParentNode, ParentNode } from "./hastUtils";

function createCopyButton(): Element {
  return {
    type: "element",
    tagName: "button",
    properties: {
      type: "button",
      className: ["copy-code-button"],
      "data-copy-button": "",
      "aria-label": "Copy code to clipboard",
    },
    children: [
      {
        type: "element",
        tagName: "span",
        properties: { className: ["visually-hidden"] },
        children: [{ type: "text", value: "Copy code" }],
      },
    ],
  };
}

function walk(node: ParentNode) {
  const children: unknown[] = node.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (isElement(child, "pre") && hasClass(child, "shiki")) {
      children[i] = {
        type: "element",
        tagName: "div",
        properties: { className: ["code-block"] },
        children: [createCopyButton(), child],
      };
      continue;
    }

    if (isParentNode(child)) {
      walk(child);
    }
  }
}

export function rehypeCodeCopyButton() {
  return (tree: Root) => {
    walk(tree);
  };
}
