import { useEffect, useState } from 'react'
import { CATEGORY_TECH_FRONT, CATEGORY_TECH_DESIGN, CATEGORY_TECH_BACK, CATEGORY_IDEA } from "@components/block/DropdownOptions";

export type BlockType = {
    block_id: number
    block_title: string
    category_name: string
    oneline_summary: string
    block_type: string
    tech_part: string
    user_id: number
    user_name: string
}

const useCardList = (
    isTech?: boolean,
    frontendCategory?: string,
    backendCategory?: string,
    designCategory?: string,
    ideaCategory?: string
) => {
    const [cards, setCards] = useState<BlockType[]>([])

    useEffect(() => {
        fetch('/dummyBlocks.json')
            .then(res => res.json())
            .then((data: BlockType[]) => {
                let filtered: BlockType[] = []

                if (typeof isTech === 'boolean') {
                    filtered = data.filter(block =>
                        isTech ? block.block_type === 'technology' : block.block_type === 'idea'
                    )
                } else if (frontendCategory) {
                    const matchedOption = CATEGORY_TECH_FRONT.find(option => option.label === frontendCategory);
                    const categoryValue = matchedOption?.value;
                    filtered = data.filter(block =>
                        block.block_type === 'technology' &&
                        block.tech_part === 'frontend' &&
                        block.category_name === categoryValue
                    )
                } else if (backendCategory) {
                    filtered = data.filter(block =>
                        block.block_type === 'technology' &&
                        block.tech_part === 'backend' &&
                        block.category_name === backendCategory
                    )
                } else if (designCategory) {
                    filtered = data.filter(block =>
                        block.block_type === 'technology' &&
                        block.tech_part === 'design' &&
                        block.category_name === designCategory
                    )
                } else if (ideaCategory) {
                    filtered = data.filter(block =>
                        block.block_type === 'idea' &&
                        block.category_name === ideaCategory
                    )
                }

                setCards(filtered)
            })
            .catch(console.error)
    }, [isTech, frontendCategory, backendCategory, designCategory, ideaCategory])

    return cards
}

export default useCardList
