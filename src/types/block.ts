export type BlockType = "TECHNOLOGY" | "IDEA";

export type TechPart = "FRONTEND" | "BACKEND" | "DESIGN" | null;

export interface BlockData {
  blockId: number;
  blockType: BlockType;
  blockTitle: string;
  categoryName: string;
  techPart: string;
  contributionScore: number;
  toolsText: string;
  oneLineSummary: string;
  improvementPoint: string;
  resultUrl: string;
  resultFile: string;
  writerId: number;
  writerNickname: string;
}

export interface NewBlockData {
  blockType: BlockType;
  blockTitle: string;
  categoryName: string;
  techPart: TechPart;
  contributionScore: number;
  toolsText: string | null;
  oneLineSummary: string;
  improvementPoint: string;
  resultUrl: string;
  resultFile: string;
}
