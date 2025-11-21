import { useEffect, useState } from "react"

type BoardType = {
    board_id: number,
    user_id: number,
    board_name: string,
    board_memo: string,
    created_at: string
}

const useBoardList = () => {
    const [boards, setBoards] = useState<BoardType[]>([])

    useEffect(() => {
        fetch('/dummyBoards.json')
            .then(res => res.json())
            .then((data: BoardType[]) => setBoards(data))
            .catch(console.error)
    }, [])
    
    return boards
}

export default useBoardList