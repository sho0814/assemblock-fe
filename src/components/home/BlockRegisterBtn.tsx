import { useNavigate } from "react-router-dom"

export default function BlockRegisterBtn() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/block/register')}>블록 등록하기</button>
        </div>
    )
}