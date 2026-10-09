import { readFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIR = join(process.cwd(), "content/articles");

export function getArticleMarkdown(slug: string): string | null {
  try {
    return readFileSync(join(CONTENT_DIR, `${slug}.md`), "utf-8");
  } catch {
    return null;
  }
}
