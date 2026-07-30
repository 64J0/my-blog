export interface ReferencesIssue {
  line: number;
  message: string;
}

const REFERENCES_HEADING = /^(#+)\s+(References|Referências):?\s*$/i;
const ANY_HEADING = /^#+\s/;
const BULLET_ITEM = /^\s*([-*+]|\d+\.)\s/;
const REDUNDANT_DASH_ITEM = /^-\s*\[\d+\]\s*-\s/;

// Checks the project-specific convention established for post reference
// sections: a level-2 heading (no trailing colon) whose list uses "- "
// bullets (no "1.", "*", "+", or a redundant "- " after "[n]"). Only lines
// inside the section (up to the next heading) are checked, so unrelated
// lists elsewhere in the post (e.g. "## Related posts") aren't affected.
export function checkReferencesFormat(content: string): ReferencesIssue[] {
  const issues: ReferencesIssue[] = [];
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const headingMatch = line.match(REFERENCES_HEADING);
    if (!headingMatch) return;

    const [, hashes] = headingMatch;
    if (hashes.length !== 2) {
      issues.push({
        line: index + 1,
        message: `References heading should be level 2 ("##"), found level ${hashes.length}.`,
      });
    }

    if (line.trimEnd().endsWith(":")) {
      issues.push({ line: index + 1, message: "References heading should not end with a colon." });
    }

    let sawBulletItem = false;
    let sawContentLine = false;

    for (let i = index + 1; i < lines.length && !ANY_HEADING.test(lines[i]); i++) {
      const sectionLine = lines[i];
      if (sectionLine.trim() !== "") {
        sawContentLine = true;
      }

      const bulletMatch = sectionLine.match(BULLET_ITEM);
      if (!bulletMatch) continue;

      sawBulletItem = true;
      const marker = bulletMatch[1];

      if (marker !== "-") {
        issues.push({ line: i + 1, message: `References list should use "-" bullets, found "${marker}".` });
      } else if (REDUNDANT_DASH_ITEM.test(sectionLine.trim())) {
        issues.push({
          line: i + 1,
          message: "Reference item has a redundant \"- \" after the \"[n]\" marker (expected \"- [n] Description...\").",
        });
      }
    }

    if (sawContentLine && !sawBulletItem) {
      issues.push({
        line: index + 1,
        message: "References section doesn't appear to use a \"- \" bulleted list.",
      });
    }
  });

  return issues;
}
