// src/api/board.ts
import { authApi } from '@api';
import type { BoardListItem, BoardDetail } from '@types';

export const fetchBoards = async (): Promise<BoardListItem[]> => {
    const response = await authApi.get('/boards');
    return response.data;
};

export const createBoard = async (boardName: string, boardMemo: string): Promise<BoardDetail> => {
    const response = await authApi.post('/boards', {
        boardName,
        boardMemo
    });
    return response.data;
}

// 보드 상세 조회 (blocks 포함)
export const fetchBoardDetail = async (boardId: number): Promise<BoardDetail> => {
  const response = await authApi.get(`/boards/${boardId}`);
  return response.data;
};
