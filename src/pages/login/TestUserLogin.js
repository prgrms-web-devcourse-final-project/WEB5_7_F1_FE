import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TestUserLogin = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const doLogin = async () => {
            try {
                await axios.post(`/user/test/login/${userId}`, {}, { skipAuthInterceptor: true });
                navigate("/room", { replace: true });
            } catch (e) {
                // 실패 시에도 일단 로그인 화면으로 보냄
                navigate("/login", { replace: true });
            }
        };
        if (userId) {
            doLogin();
        }
    }, [userId, navigate]);

    return null;
};

export default TestUserLogin;


