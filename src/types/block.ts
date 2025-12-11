export type BlockType = "TECHNOLOGY" | "IDEA";
export type TechPart = "FrontEnd" | "BackEnd" | "Design";

export interface Block {
  blockId: number;
  blockTitle: string;
  categoryName: string;
  techPart?: TechPart | null;
  blockType: BlockType;
  contributionScore: number;
  toolsText?: string | null;
  oneLineSummary: string;
  improvementPoint: string;
  resultUrl: string;
  resultFile: string;
}

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
