import type { Article } from "./articles";

export const articleBodies: Record<string, (article: Article) => string> = {};
