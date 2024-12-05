export interface HistoryItem {
  id: number;
  createdBy: string;
  aiResponse?: string;
  templateSlug?: string;
  createdAt?: Date;
  templateName?: string;
  templateIcon?: string;
}
