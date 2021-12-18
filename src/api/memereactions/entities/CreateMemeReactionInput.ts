export interface CreateMemeReactionInput {
  memeId: string;
  userId: string;
  reaction: {
    native?: string;
    name: string;
    colons?: string;
    skin?: number;
    isCustom: boolean;
    imageUrl?: string;
  };
}
