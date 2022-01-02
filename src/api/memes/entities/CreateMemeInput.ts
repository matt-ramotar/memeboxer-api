export interface CreateMemeInput {
  data: string;
  templateId: string;
  userId: string;
  caption?: string;
  tags?: string[];
  location?: string;
  text?: string[];
  memeTagInputs?: MemeTagInput[];
}

export interface MemeTagInput {
  userId: string;
  xOffset: number;
  yOffset: number;
  username: string;
}
