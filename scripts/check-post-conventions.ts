import fs from "fs";
import path from "path";

import { checkReferencesFormat } from "../lib/checkReferencesFormat";

const postsDirectory = path.join(process.cwd(), "posts");
const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));

let hasIssues = false;

for (const fileName of fileNames) {
  const content = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const issues = checkReferencesFormat(content);

  if (issues.length > 0) {
    hasIssues = true;
    console.error(`\n${fileName}`);
    for (const issue of issues) {
      console.error(`  line ${issue.line}: ${issue.message}`);
    }
  }
}

if (hasIssues) {
  console.error("\nSome posts don't follow the references-section convention (see lib/checkReferencesFormat.ts).");
  process.exit(1);
} else {
  console.log(`Checked ${fileNames.length} posts, references formatting OK.`);
}
