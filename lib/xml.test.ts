import { describe, expect, it } from "vitest";

import { xmlEscape } from "./xml";

describe("xmlEscape", () => {
  it("escapes all five XML special characters", () => {
    expect(xmlEscape("<a href=\"x\">Tom & Jerry's</a>")).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&apos;s&lt;/a&gt;",
    );
  });

  it("leaves plain text untouched", () => {
    expect(xmlEscape("nothing special here")).toBe("nothing special here");
  });
});
