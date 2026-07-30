import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

import { PostMeta, PostData, AdjacentPosts, TocEntry } from "../types/posts";
import { rehypeOptimizeImages } from "./rehypeOptimizeImages";
import { rehypeImageCaptions } from "./rehypeImageCaptions";
import { rehypeCodeCopyButton } from "./rehypeCodeCopyButton";
import { rehypeTableOfContents } from "./rehypeTableOfContents";
import { SITE_URL } from "./site";

const WORDS_PER_MINUTE = 200;
const DESCRIPTION_MAX_LENGTH = 160;

const postsDirectory = path.join(process.cwd(), "posts");

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function deriveDescription(plainText: string): string {
  if (plainText.length <= DESCRIPTION_MAX_LENGTH) {
    return plainText;
  }

  const truncated = plainText.slice(0, DESCRIPTION_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : DESCRIPTION_MAX_LENGTH)}...`;
}

export function deriveReadingTimeMinutes(plainText: string): number {
  const wordCount = plainText.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

// contentHtml is already HTML-escaped (e.g. a literal "&" in an optimized
// image URL is serialized as "&#x26;"), but the value returned here gets
// re-serialized as an attribute again later (in <meta property="og:image">),
// so it must come back out as a plain, unescaped string first.
function unescapeHtmlEntities(value: string): string {
  return value
    .replace(/&#x26;|&#38;|&amp;/gi, "&")
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, "\"");
}

export function resolveOgImage(contentHtml: string): string | null {
  // Most social-media crawlers render OG images poorly (or not at all) when
  // they're SVGs, so skip those in favor of the first raster image.
  const matches = contentHtml.matchAll(/<img[^>]+src="([^"]+)"/g);

  for (const match of matches) {
    const src = unescapeHtmlEntities(match[1]);
    if (src.toLowerCase().includes(".svg")) {
      continue;
    }

    return src.startsWith("http") ? src : `${SITE_URL}${src}`;
  }

  return null;
}

export function getSortedPostData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostData = fileNames.map((fileName): PostMeta | undefined => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    if (!matterResult.data.show) {
      return undefined;
    }

    return {
      id,
      ...(matterResult.data as Omit<PostMeta, "id">),
    };
  });

  return allPostData
    .filter((post): post is PostMeta => post !== undefined)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, "") },
  }));
}

// getSortedPostData() returns posts newest-first, so the previous array index
// is the newer post and the next index is the older one.
export function getAdjacentPosts(id: string): AdjacentPosts {
  const posts = getSortedPostData();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return { older: null, newer: null };
  }

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export async function getPostData(filename: string | string[] | undefined): Promise<PostData> {
  const id = Array.isArray(filename) ? filename[0] : filename;

  if (!id) {
    return {
      id: "error",
      contentHtml: "",
      title: "Error",
      date: new Date().toISOString(),
      show: false,
      description: "",
      readingTimeMinutes: 1,
      ogImage: null,
      toc: [],
    };
  }

  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const toc: TocEntry[] = [];

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
      defaultColor: false,
    })
    .use(rehypeTableOfContents, toc)
    .use(rehypeOptimizeImages)
    .use(rehypeImageCaptions)
    .use(rehypeCodeCopyButton)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const plainText = stripHtml(contentHtml);

  return {
    id,
    contentHtml,
    toc,
    ...(matterResult.data as Omit<PostData, "id" | "contentHtml" | "toc">),
    description: (matterResult.data.description as string | undefined) ?? deriveDescription(plainText),
    readingTimeMinutes: deriveReadingTimeMinutes(plainText),
    ogImage: resolveOgImage(contentHtml),
  };
}
