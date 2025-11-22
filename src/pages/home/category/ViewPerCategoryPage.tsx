import { useParams } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";

export function ViewPerCategoryPage() {
    const { techpart } = useParams();
    
    const renderContent = () => {
        switch (techpart) {
            case "frontend":
                return
            case "backend":
                return
            case "design":
                return
            default:
                return
        }
    }

    return (
        <>
            <SimpleHeader title={techpart}></SimpleHeader>
        </>

    )
}