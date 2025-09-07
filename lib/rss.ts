import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface NewFeedItem {
  title: string;
  description: string | undefined;
  link: string;
  pubDate: string;
  postId: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

const createRssDoc = (items: string) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>64J0's Blog</title>
    <description>This is 64J0's personal blog, where I share my thoughts regarding technology, programming, philosophy, theology, and more.</description>
    <link>https://gaio.dev/</link>
    ${items}
  </channel>
</rss>`;

const createNewFeedItem = ({ title, link, pubDate, postId, description }: NewFeedItem) => {
  return `
    <item>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <guid isPermaLink="false">${postId}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
};

export function getRssData(): string {
  let items = fs
    .readdirSync(postsDirectory)
    .map((fileName) => {
      return [ path.join(postsDirectory, fileName), fileName ];
    })
    .map(([ filePath, fileName ]) => {
      return [ fs.readFileSync(filePath, "utf8"), fileName ];
    })
    .map(([ fileContents, fileName ]) => {
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      return [ matterResult, fileName ] as [ matter.GrayMatterFile<string>, string ];
    })
    .filter(([ matterResult ]) => {
      return matterResult.data.show;
    })
    .map(([ matterResult, fileName ]) => {
      return createNewFeedItem({
        title: matterResult.data.title,
        description: matterResult.data.description,
        link: `https://gaio.dev/posts/${fileName.replace(/\.md$/, "")}`,
        pubDate: matterResult.data.date,
        postId: fileName
      });
    })
    .reduceRight((acc, curr) => acc + curr, "");

  return createRssDoc(items);
}
