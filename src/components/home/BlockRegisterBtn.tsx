import { useNavigate } from "react-router-dom"
export function BlockRegisterBtn() {
    const navigate = useNavigate();

    return (
        <div>
            <div onClick={() => navigate('/')}></div>
        </div>
    )
}