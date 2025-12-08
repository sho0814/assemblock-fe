import { useParams } from "react-router-dom"
import SearchBar from "@components/search/SearchBar";
import SearchResultList from "@components/search/SearchResultList";

export function SearchResultPage() {
    const { keyword } = useParams<{ keyword?: string }>();

    return (
        <>
            <SearchBar PrevSearch={keyword ?? ""} />
            <SearchResultList keyword={keyword?? ""}/>
        </>
    );
}