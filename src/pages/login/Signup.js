"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NicknameForm from "./NicknameForm"
import styles from "./Login.module.scss"

const Signup = () => {
    const [nickname, setNickname] = useState("")
    const [error, setError] = useState({
        nickname: "",
    })
    const [inputStatus, setInputStatus] = useState({
        nickname: false,
    })
    const navigate = useNavigate()

    const handleSignupClick = (e) => {
        e.preventDefault()
        if (nickname.length === 0) {
            setError({ ...error, nickname: "별명을 입력하세요." })
            return
        }

        // 회원가입 완료 후 방 목록으로 이동
        navigate("/room")
    }

    const handleCancel = () => {
        navigate(-1) // 이전 페이지로 돌아가기
    }

    return (
        <div className={styles.signupContainer}>
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
                        <button type="submit" className={styles.primaryButton}>
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