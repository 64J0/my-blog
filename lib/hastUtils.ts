import type { Element, Root } from "hast";

export type ParentNode = Root | Element;

export function isElementNode(node: unknown): node is Element {
  return typeof node === "object" && node !== null && (node as { type?: string }).type === "element";
}

export function isParentNode(node: unknown): node is ParentNode {
  if (typeof node !== "object" || node === null) return false;
  const type = (node as { type?: string }).type;
  return (type === "element" || type === "root") && Array.isArray((node as ParentNode).children);
}

export function isElement(node: unknown, tagName: string): node is Element {
  return isElementNode(node) && node.tagName === tagName;
}

// hast's own `className` convention is an array, but tools like Shiki set a
// raw `class` string instead, so both need checking here.
export function hasClass(node: Element, className: string): boolean {
  const properties = node.properties as Record<string, unknown> | undefined;
  const classValue = properties?.className ?? properties?.class;

  if (Array.isArray(classValue)) {
    return classValue.some((token) => String(token) === className);
  }

  if (typeof classValue === "string") {
    return classValue.split(/\s+/).includes(className);
  }

  return false;
}
