import type { BlockData, TechPart } from "./block";
import type { ProfileType } from "./project";

// 블록 타입 참고용
// export interface Block {
//   blockId: number;
//   blockTitle: string;
//   categoryName: string;
//   techPart?: TechPart | null;
//   blockType: BlockType;
//   contributionScore: number;
//   toolsText?: string | null;
//   oneLineSummary: string;
//   improvementPoint: string;
//   resultUrl: string;
//   resultFile: string;
// }

export interface ProposalDetailResponse {
  proposalId: number;
  proposerId: number;
  proposerNickname: string;
  proposerProfileType: ProfileType;
  proposerTechPart: TechPart;
  discordId: string;
  recruitStartDate: string;
  recruitEndDate: string;
  projectTitle: string;
  projectMemo: string;
  targetBlocks: BlockData[];
}
