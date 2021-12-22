export interface CreateMemeInput {
  data: string;
  templateId: string;
  userId: string;
  caption?: string;
  tags?: string[];
  location?: string;
}
