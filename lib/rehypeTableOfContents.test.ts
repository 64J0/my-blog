import { describe, expect, it } from "vitest";

import { slugify, uniqueSlug } from "./rehypeTableOfContents";

describe("slugify", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugify("Using SkiaSharp to Resize Images")).toBe("using-skiasharp-to-resize-images");
  });

  it("strips punctuation that isn't a word character or hyphen", () => {
    expect(slugify("F#: What's the deal?")).toBe("f-whats-the-deal");
  });

  it("collapses repeated separators", () => {
    expect(slugify("Too   many -- spaces")).toBe("too-many-spaces");
  });
});

describe("uniqueSlug", () => {
  it("returns the plain slug the first time a heading text is seen", () => {
    const used = new Map<string, number>();
    expect(uniqueSlug("Conclusion", used)).toBe("conclusion");
  });

  it("appends an incrementing suffix for duplicate heading text", () => {
    const used = new Map<string, number>();
    expect(uniqueSlug("Conclusion", used)).toBe("conclusion");
    expect(uniqueSlug("Conclusion", used)).toBe("conclusion-1");
    expect(uniqueSlug("Conclusion", used)).toBe("conclusion-2");
  });

  it("falls back to a generic slug for headings with no sluggable characters", () => {
    const used = new Map<string, number>();
    expect(uniqueSlug("🎉", used)).toBe("section");
  });
});
