import { CATEGORY_ALL, TOOLS_ALL } from "@constants";

const getValuesFromLabels = (label: string, options: any[]) => {
    const option = options.find(opt => opt.label === label);
    return option?.value || label;
};

export const getToolValuesFromLabels = (label: string): string[] => {
    return getValuesFromLabels(label, TOOLS_ALL);
}

export const getCategoryValuesFromLabels = (label: string): string[] => {
    return getValuesFromLabels(label, CATEGORY_ALL);
}
