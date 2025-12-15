// src/hooks/useBoardList.ts - 업데이트
import { useEffect } from "react"
import { fetchBoards, createBoard } from "@api"
import { useBoardStore } from "@stores"
import type { BoardListItem, MinimalBoard } from "@types"

export const useBoards = () => {
    const { boards, loadBoards, addBoard } = useBoardStore()

    const fetchAndCacheBoards = async () => {
        try {
            const data: BoardListItem[] = await fetchBoards()
            const minimalBoards: MinimalBoard[] = data.map((board: any) => ({
                boardId: board.boardId,
                boardName: board.boardName
            }))
            loadBoards(minimalBoards)
        } catch (error) {
            console.error("Failed to fetch boards:", error)
        }
    }

    const createNewBoard = async (boardName: string, boardMemo?: string) => {
        try {
            const newBoard = await createBoard(boardName, boardMemo || "") // 백엔드에 보드 추가, 보드 정보 반환
            const minimalNewBoard: MinimalBoard = { // 스토어에 저장할 보드 정보
                boardId: newBoard.boardId,
                boardName: newBoard.boardName
            }
            addBoard(minimalNewBoard)
        } catch (error) {
            console.error("Failed to create board:", error)
        }
    }

    useEffect(() => {
        // 1. 로컬에서 즉시 로드
        loadBoards()
        // 2. 백그라운드에서 서버 동기화 (debounce 필요시)
        const timer = setTimeout(() => {
            fetchAndCacheBoards()
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return {
        boards,
        fetchAndCacheBoards,  // 수동 새로고침용
        createNewBoard
    }
}

