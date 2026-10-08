export type Project = {
  slug: string;
  name: string;
  role: string;
  version?: string;
  summary: string;
  bullets: string[];
  href: string;
};

export const projects: Project[] = [];
