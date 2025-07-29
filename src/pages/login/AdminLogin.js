import { useNavigate } from "react-router-dom"
import mainLogo from "../../assets/images/main-logo-rect.png"
import styles from "./Login.module.scss"
import {useState} from "react";
import {useApiMutation} from "../../hooks/useApiMutation";
import axios from "axios";
import Spinner from "../../shared/Spinner";

const loginRequest = async ({ username, password }) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await axios.post('/admin/login', params, {
        skipAuthInterceptor: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data;
};

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const { mutate: loginMutate, isLoading } = useApiMutation(loginRequest, {
        onSuccess: () => {
            navigate("/room");
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginMutate(loginData);
    }

    return (
        <div className={styles.loginContainer}>
            <Spinner show={isLoading} />
            <div className={styles.loginCard}>
                <div className={styles.loginLogo}>
                    <img src={mainLogo || "/placeholder.svg"} alt="뇌피셜 로고" className={styles.loginLogoImage} />
                </div>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <input
                          type="text"
                          name="username"
                          placeholder="아이디"
                          value={loginData.username}
                          onChange={handleInputChange}
                          className={styles.loginInput}
                          required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={loginData.password}
                            onChange={handleInputChange}
                            className={styles.loginInput}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.loginButton}>
                        관리자 로그인
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin