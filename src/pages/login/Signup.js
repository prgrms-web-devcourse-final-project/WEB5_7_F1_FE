import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NicknameForm from "./NicknameForm"
import styles from "./Login.module.scss"
import axios from "axios";
import {useApiMutation} from "../../hooks/useApiMutation";
import Spinner from "../../shared/Spinner";

const signupRequest = async (nickname) => {
    const params = {
        nickname
    };
    const response = await axios.post(`/signup`, params);
    return response.data;
};

const Signup = () => {
    const [nickname, setNickname] = useState("")
    const [error, setError] = useState({
        nickname: "",
    });
    const [inputStatus, setInputStatus] = useState({
        nickname: false,
    });
    const navigate = useNavigate();
    const { mutate: signupMutate, isLoading } = useApiMutation(signupRequest, {
        onSuccess: () => {
            navigate("/room");
        },
    });

    const handleSignupClick = (e) => {
        e.preventDefault();
        if (inputStatus.nickname) {
            signupMutate(nickname);
        } else {
            setError({ ...error, nickname: "중복체크를 먼저 해주세요." })
        }
    }

    const handleCancel = () => {
        navigate(-1) // 이전 페이지로 돌아가기
    }

    return (
        <div className={styles.signupContainer}>
            <Spinner show={isLoading} />
            <div className={styles.signupCard}>
                <div className={styles.signupHeader}>
                    <h1 className={styles.signupTitle}>회원가입</h1>
                    <p className={styles.signupSubtitle}>뇌이싱을 시작하기 위해 닉네임을 설정해주세요</p>
                </div>

                <form className={styles.signupForm} onSubmit={handleSignupClick}>
                    <NicknameForm
                        nickname={nickname}
                        setNickname={setNickname}
                        error={error}
                        setError={setError}
                        setInputStatus={setInputStatus}
                    />

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.primaryButton} onClick={handleSignupClick}>
                            회원가입 완료
                        </button>
                        <button type="button" className={styles.secondaryButton} onClick={handleCancel}>
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup