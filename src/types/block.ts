export type BlockType = "TECHNOLOGY" | "IDEA";
export type TechPart = "FrontEnd" | "BackEnd" | "Design";

export interface SearchBlock {
  blockId: number;
  title: string;
  nickname: string;
  onelineSummary: string;
  profileType: string;
  categoryName: string;
  techPart?: TechPart | null;
  blockType: BlockType;
}
