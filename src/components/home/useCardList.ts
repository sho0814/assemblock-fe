import { useEffect, useState } from 'react'

type BlockType = {
    block_id: number
    block_title: string
    category_name: string
    oneline_summary: string
    block_type: string
    tech_part: string
    user_id: number
    user_name: string
}

const useCardList = (isTech: boolean) => {
    const [cards, setCards] = useState<BlockType[]>([])

    useEffect(() => {
        fetch('/dummyBlocks.json')
            .then(res => res.json())
            .then((data: BlockType[]) => {
                const filtered = data.filter(block =>
                    isTech ? block.block_type === 'technology' : block.block_type === 'idea'
                )
                setCards(filtered)
            })
            .catch(console.error)
    }, [isTech]) // isTech가 바뀔 때마다 재실행

    return cards
}

export default useCardList
