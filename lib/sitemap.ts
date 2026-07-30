import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { SITE_URL } from "./site";
import { xmlEscape } from "./xml";

const postsDirectory = path.join(process.cwd(), "posts");

interface SitemapUrl {
  loc: string;
  lastmod?: string;
}

const createUrlEntry = ({ loc, lastmod }: SitemapUrl): string => `
  <url>
    <loc>${xmlEscape(loc)}</loc>${lastmod ? `\n    <lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}
  </url>`;

export function getSitemapData(): string {
  const staticUrls: SitemapUrl[] = [
    { loc: `${SITE_URL}/` },
    { loc: `${SITE_URL}/about` },
  ];

  const postUrls: SitemapUrl[] = fs
    .readdirSync(postsDirectory)
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const matterResult = matter(fs.readFileSync(fullPath, "utf8"));
      return { fileName, data: matterResult.data };
    })
    .filter(({ data }) => data.show)
    .map(({ fileName, data }) => ({
      loc: `${SITE_URL}/posts/${fileName.replace(/\.md$/, "")}`,
      lastmod: data.date,
    }));

  const urls = [...staticUrls, ...postUrls].map(createUrlEntry).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}
