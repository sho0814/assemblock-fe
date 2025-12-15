// src/hooks/useBlocks.ts
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlock, addBlockToBoard } from "@api";
import type { NewBlockData } from "@types";

export const useBlocks = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const createNewBlock = useCallback(async (blockData: NewBlockData): Promise<any> => {
        setLoading(true);
        try {
            const response = await createBlock(blockData);
            navigate(-1);
            return response;
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const addToBoard = useCallback(async (boardId: number, blockId: number): Promise<any> => {
        setLoading(true);
        try {
            const response = await addBlockToBoard(boardId, blockId);
            return response;
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    }, [])

    return {
        loading,
        createNewBlock,
        addToBoard
    };
};