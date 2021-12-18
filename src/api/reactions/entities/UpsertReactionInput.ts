export interface UpsertReactionInput {
  native?: string;
  name: string;
  colons?: string;
  skin?: number | null;
  isCustom: boolean;
  imageUrl?: string;
}
