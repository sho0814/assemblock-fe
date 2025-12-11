// src/hooks/useFetchBlocks.ts
// api연결 안되어있음!! 하드코딩
import { useEffect, useState } from 'react'
import { CATEGORY_TECH_FRONT, CATEGORY_TECH_DESIGN, CATEGORY_TECH_BACK, CATEGORY_IDEA } from "@constants";
import type { BlockData } from '@types';

export const useFetchBlocks = (
    isTech?: boolean,
    frontendCategory?: string,
    backendCategory?: string,
    designCategory?: string,
    ideaCategory?: string
) => {
    const [cards, setCards] = useState<BlockData[]>([])

    useEffect(() => {
        fetch('/dummyBlocks.json')
            .then(res => res.json())
            .then((data: BlockData[]) => {
                let filtered: BlockData[] = []

                if (typeof isTech === 'boolean') {
                    filtered = data.filter(block =>
                        isTech ? block.blockType === 'TECHNOLOGY' : block.blockType === 'IDEA'
                    )
                } else if (frontendCategory) {
                    const matchedOption = CATEGORY_TECH_FRONT.find(option => option.label === frontendCategory);
                    const categoryValue = matchedOption?.value;
                    filtered = data.filter(block =>
                        block.blockType === 'TECHNOLOGY' &&
                        block.techPart === 'frontend' &&
                        block.categoryName === categoryValue
                    )
                } else if (backendCategory) {
                    filtered = data.filter(block =>
                        block.blockType === 'TECHNOLOGY' &&
                        block.techPart === 'backend' &&
                        block.categoryName === backendCategory
                    )
                } else if (designCategory) {
                    filtered = data.filter(block =>
                        block.blockType === 'TECHNOLOGY' &&
                        block.techPart === 'design' &&
                        block.categoryName === designCategory
                    )
                } else if (ideaCategory) {
                    filtered = data.filter(block =>
                        block.blockType === 'IDEA' &&
                        block.categoryName === ideaCategory
                    )
                }

                setCards(filtered)
            })
            .catch(console.error)
    }, [isTech, frontendCategory, backendCategory, designCategory, ideaCategory])

    return cards
};
