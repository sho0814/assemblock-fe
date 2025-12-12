// src/hooks/useBlocks.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createBlock, addBlockToBoard } from "@api";
import type { NewBlockData } from "@types";

export const useBlocks = () => {
    const navigate = useNavigate();

    const createNewBlock = useCallback(async (blockData: NewBlockData): Promise<any> => {
        try {
            const response = await createBlock(blockData);
            navigate(-1);
            return response;
        } catch (err: any) {
            throw err;
        }
    }, [navigate]);

    const addToBoard = async(boardId: number, blockId: number): Promise<any> => {
        try {
            const response = await addBlockToBoard(boardId, blockId);
            return response;
        } catch (err:any) {
            throw err;
        }
    }

    return {
        createNewBlock,
        addToBoard
    };
};