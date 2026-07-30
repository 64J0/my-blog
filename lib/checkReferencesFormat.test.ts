import { describe, expect, it } from "vitest";

import { checkReferencesFormat } from "./checkReferencesFormat";

describe("checkReferencesFormat", () => {
  it("reports nothing for a correctly formatted references section", () => {
    const content = [
      "## References",
      "",
      "- [1] Some source. [link](https://example.com).",
      "- [2] Another source. [link](https://example.com).",
    ].join("\n");

    expect(checkReferencesFormat(content)).toEqual([]);
  });

  it("allows an intro sentence before the list starts", () => {
    const content = [
      "## References",
      "",
      "Sources used while writing this post:",
      "",
      "- [1] Some source.",
    ].join("\n");

    expect(checkReferencesFormat(content)).toEqual([]);
  });

  it("flags a heading level other than 2", () => {
    const content = ["# References", "", "- [1] Some source."].join("\n");
    const issues = checkReferencesFormat(content);

    expect(issues.some((issue) => issue.message.match(/level 2/))).toBe(true);
  });

  it("flags a redundant dash after the [n] marker", () => {
    const content = ["## References", "", "- [1] - Some source."].join("\n");
    const issues = checkReferencesFormat(content);

    expect(issues.some((issue) => issue.message.includes("redundant"))).toBe(true);
  });

  it("flags a numbered list instead of dash bullets", () => {
    const content = ["## References", "", "1. Some source."].join("\n");
    const issues = checkReferencesFormat(content);

    expect(issues.some((issue) => issue.message.includes("bullets"))).toBe(true);
  });

  it("flags a references section with no bulleted list at all", () => {
    const content = ["## References", "", "[1] - Just a plain paragraph, no bullet."].join("\n");
    const issues = checkReferencesFormat(content);

    expect(issues.some((issue) => issue.message.includes("bulleted list"))).toBe(true);
  });

  it("accepts a Portuguese heading without a trailing colon", () => {
    const content = ["## Referências", "", "- [1] Alguma fonte."].join("\n");
    expect(checkReferencesFormat(content)).toEqual([]);
  });

  it("flags a heading with a trailing colon", () => {
    const content = ["## Referências:", "", "- [1] Alguma fonte."].join("\n");
    const issues = checkReferencesFormat(content);

    expect(issues.some((issue) => issue.message.includes("colon"))).toBe(true);
  });

  it("ignores posts with no references section", () => {
    expect(checkReferencesFormat("# Title\n\nJust a paragraph.")).toEqual([]);
  });

  it("doesn't flag an unrelated section that happens to use a similar dash pattern", () => {
    const content = [
      "## Related posts",
      "",
      "- [1] - Some other post: [link](/posts/other).",
    ].join("\n");

    expect(checkReferencesFormat(content)).toEqual([]);
  });

  it("stops scanning a references section at the next heading", () => {
    const content = [
      "## References",
      "",
      "- [1] Some source.",
      "",
      "## Related posts",
      "",
      "1. Not a references entry, shouldn't be flagged.",
    ].join("\n");

    expect(checkReferencesFormat(content)).toEqual([]);
  });
});
