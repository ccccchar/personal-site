export type TimelineEntry = {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
};

export const timeline: TimelineEntry[] = [];
