// stores/boardStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MinimalBoard } from '@types'

interface BoardState {
  boards: MinimalBoard[]
  loadBoards: (freshData?: MinimalBoard[]) => void
  addBoard: (board: MinimalBoard) => void
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: [],
      
      loadBoards: (freshData?: MinimalBoard[]) => {
        if (freshData) { // 서버에서 새 데이터 있으면 로컬에 덮어쓰기
          set({ boards: freshData })
        } else { // 최초 진입시 로컬 데이터만 로드
          const boards = get().boards
          if (boards.length === 0) {
            // 백엔드 호출 필요시 트리거할 수 있도록 빈 배열 유지
          }
        }
      },
      
      addBoard: (board: MinimalBoard) => {
        set((state) => ({
          boards: [...state.boards, board]
        }))
      },
      
    }),
    {
      name: 'board-storage', // localStorage 키
      partialize: (state) => ({ boards: state.boards }),
    }
  )
)
