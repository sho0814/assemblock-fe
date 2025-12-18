import type { BlockType, BlockData } from '@types'

export interface BoardListItem {
  boardId: number;
  boardName: string;
  boardMemo: string | null;
  createdAt: string;
  blockCount: number;
  previewTypes: BlockType[];   // previewType -> previewTypes 수정
}

export interface MinimalBoard {
  boardId: number;
  boardName: string;
  blockCount?: number;          // 추가
  previewTypes?: BlockType[];   // 추가
}

export interface BoardDetail {
  boardId: number;
  boardName: string;
  boardMemo: string;
  blocks: BlockData[] | null;
}
