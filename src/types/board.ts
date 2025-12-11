import type { BlockType, BlockData } from '@types'

export interface BoardListItem {
    boardId: number;
    boardName: string;
    boardMemo: string | null;
    createdAt: string;
    blockCount: number;
    previewType: BlockType[];
}

export interface MinimalBoard {
    boardId: number;
    boardName: string;
}

export interface BoardDetail {
    boardId: number;
    boardName: string;
    boardMemo: string;
    blocks: BlockData[] | null;
}