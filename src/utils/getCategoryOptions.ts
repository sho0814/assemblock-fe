// src/utils/getCategoryOptions.ts
import {
    CATEGORY_IDEA,
    CATEGORY_TECH_DESIGN,
    CATEGORY_TECH_FRONT,
    CATEGORY_TECH_BACK,
    TOOLS_DESIGN,
    TOOLS_FRONT,
    TOOLS_BACK
} from '@constants';
import type { TechPart } from '@types';

export interface CategoryOptionsResult {
    categoryOptions: typeof CATEGORY_IDEA;
    toolsOptions: typeof TOOLS_DESIGN;
}

export const getCategoryOptions = (
    isTech: boolean,
    selectedTechPart: TechPart
): CategoryOptionsResult => {
    let categoryOptions = CATEGORY_IDEA;
    let toolsOptions = TOOLS_DESIGN;

    if (isTech) {
        switch (selectedTechPart) {
            case 'DESIGN':
                categoryOptions = CATEGORY_TECH_DESIGN;
                toolsOptions = TOOLS_DESIGN;
                break;
            case 'FRONTEND':
                categoryOptions = CATEGORY_TECH_FRONT;
                toolsOptions = TOOLS_FRONT;
                break;
            case 'BACKEND':
                categoryOptions = CATEGORY_TECH_BACK;
                toolsOptions = TOOLS_BACK;
                break;
            default:
                categoryOptions = CATEGORY_IDEA;
                toolsOptions = TOOLS_DESIGN;
        }
    }

    return { categoryOptions, toolsOptions };
};
