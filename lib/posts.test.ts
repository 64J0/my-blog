import { describe, expect, it } from "vitest";

import { deriveDescription, deriveReadingTimeMinutes, resolveOgImage, stripHtml } from "./posts";
import { SITE_URL } from "./site";

describe("stripHtml", () => {
  it("removes tags and collapses whitespace left behind", () => {
    expect(stripHtml("<p>Hello   <strong>world</strong></p>\n<p>!</p>")).toBe("Hello world !");
  });
});

describe("deriveDescription", () => {
  it("returns short text unchanged", () => {
    expect(deriveDescription("A short post.")).toBe("A short post.");
  });

  it("truncates long text at a word boundary and appends an ellipsis", () => {
    const longText = "word ".repeat(50).trim();
    const result = deriveDescription(longText);

    expect(result.endsWith("...")).toBe(true);
    expect(result.length).toBeLessThanOrEqual(163); // 160 + "..."
    expect(result.endsWith(" ...")).toBe(false); // cut at a word boundary, not mid-space
  });
});

describe("deriveReadingTimeMinutes", () => {
  it("rounds up to the nearest minute at 200 words per minute", () => {
    const words = "word ".repeat(201).trim();
    expect(deriveReadingTimeMinutes(words)).toBe(2);
  });

  it("never returns less than 1 minute for non-empty text", () => {
    expect(deriveReadingTimeMinutes("just a few words")).toBe(1);
  });
});

describe("resolveOgImage", () => {
  it("returns null when the post has no images", () => {
    expect(resolveOgImage("<p>No images here.</p>")).toBeNull();
  });

  it("resolves a relative image path against the site URL", () => {
    const html = "<img src=\"/post-images/example/photo.png\" alt=\"Example\">";
    expect(resolveOgImage(html)).toBe(`${SITE_URL}/post-images/example/photo.png`);
  });

  it("leaves an already-absolute image URL untouched", () => {
    const html = "<img src=\"https://cdn.example.com/photo.png\" alt=\"Example\">";
    expect(resolveOgImage(html)).toBe("https://cdn.example.com/photo.png");
  });

  it("skips SVGs in favor of the next raster image", () => {
    const html = [
      "<img src=\"/logo.svg\" alt=\"Logo\">",
      "<img src=\"/post-images/example/photo.png\" alt=\"Example\">",
    ].join("");

    expect(resolveOgImage(html)).toBe(`${SITE_URL}/post-images/example/photo.png`);
  });

  it("returns null when every image is an SVG", () => {
    expect(resolveOgImage("<img src=\"/logo.svg\" alt=\"Logo\">")).toBeNull();
  });

  it("unescapes HTML entities in the src so it can be safely re-serialized", () => {
    const html = "<img src=\"/_next/image?url=%2Fphoto.png&#x26;w=1200&#x26;q=75\" alt=\"Example\">";
    expect(resolveOgImage(html)).toBe(`${SITE_URL}/_next/image?url=%2Fphoto.png&w=1200&q=75`);
  });
});
