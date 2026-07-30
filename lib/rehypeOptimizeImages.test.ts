import { describe, expect, it } from "vitest";

import { selectWidths } from "./rehypeOptimizeImages";

const WIDTHS = [640, 828, 1200, 1920];

describe("selectWidths", () => {
  it("only ever returns widths from the given list, never the raw natural width", () => {
    // Regression test: this used to push the image's exact natural width
    // (e.g. 1050) onto the list whenever it didn't match a breakpoint
    // exactly, producing a "w" value Next's image optimizer rejects with
    // a 400 ("w" parameter is not allowed) for nearly every real image.
    for (const width of selectWidths(1050, WIDTHS)) {
      expect(WIDTHS).toContain(width);
    }
  });

  it("includes every breakpoint at or below the natural width", () => {
    expect(selectWidths(1200, WIDTHS)).toEqual([640, 828, 1200]);
  });

  it("caps at the largest breakpoint for images wider than all of them", () => {
    expect(selectWidths(3259, WIDTHS)).toEqual([640, 828, 1200, 1920]);
  });

  it("falls back to the smallest breakpoint for images narrower than all of them", () => {
    expect(selectWidths(500, WIDTHS)).toEqual([640]);
  });

  it("includes an exact match", () => {
    expect(selectWidths(828, WIDTHS)).toEqual([640, 828]);
  });
});
