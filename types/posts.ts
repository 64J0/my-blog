export interface PostMeta {
  id: string;
  title: string;
  date: string;
  show: boolean;
  description?: string;
  tags?: string[];
}

export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

export interface PostData extends PostMeta {
  contentHtml: string;
  description: string;
  readingTimeMinutes: number;
  ogImage: string | null;
  toc: TocEntry[];
}

export interface AdjacentPosts {
  older: PostMeta | null;
  newer: PostMeta | null;
}
