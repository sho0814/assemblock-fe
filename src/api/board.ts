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

// 보드 삭제 (더보기 → 삭제하기)
export const deleteBoard = async (boardId: number): Promise<void> => {
  await authApi.delete(`/boards/${boardId}`);
};

// 보드에서 블록 제거 (선택 블록 삭제)
export const removeBlockFromBoard = async (
  boardId: number,
  blockId: number
): Promise<void> => {
  await authApi.delete(`/boards/${boardId}/blocks/${blockId}`);
};

// 보드 수정 (이름/메모 저장)
export const updateBoard = async (
  boardId: number,
  payload: { boardName: string; boardMemo?: string }
): Promise<void> => {
  await authApi.put(`/boards/${boardId}`, payload);
};