import { PostData } from "../types/posts";
import { SITE_URL } from "./site";

const AUTHOR_NAME = "Vinícius Gajo";

export function buildBlogPostingSchema(postData: PostData, postUrl: string, image: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title,
    description: postData.description,
    datePublished: postData.date,
    dateModified: postData.date,
    url: postUrl,
    image,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "64J0's Blog",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}
