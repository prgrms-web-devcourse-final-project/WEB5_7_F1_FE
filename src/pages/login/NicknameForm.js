"use client"

import { useState } from "react"
import styles from "./Login.module.scss"
import { isEmptyOrNull } from "../../utils/utils"
import axios from "axios";
import {useApiMutation} from "../../hooks/useApiMutation";

const checkNicknameRequest = async (nickname) => {
    const params = {
        nickname
    };
    const response = await axios.get(`/check-nickname`, { params });
    return response.data;
};

const NicknameForm = ({ nickname, setNickname, error, setError, setInputStatus }) => {
    const [isChecked, setChecked] = useState(false);
    const { mutate: checkNicknameMutate } = useApiMutation(checkNicknameRequest, {
        onSuccess: () => {
            setChecked(true);
            setInputStatus((prev) => ({ ...prev, nickname: true }));
        },
    });

    const isValid = (value) => {
        const trimmed = value.trim()
        const regex = /^[가-힣a-zA-Z0-9]+$/ // 한글, 영문, 숫자만
        const length = Array.from(trimmed).length // 유니코드 기준 글자 수 계산 (한글 1자씩 카운트)
        return regex.test(trimmed) && length >= 1 && length <= 6
    }

    const handleNicknameCheckClick = () => {
        setChecked(false);

        if (isEmptyOrNull(nickname)) {
            setError({ ...error, nickname: "닉네임을 먼저 입력해 주세요." })
            return
        }

        if (!isValid(nickname)) {
            setError({ ...error, nickname: "한글,영문,숫자로 6자 이하만 가능합니다." })
            return
        }
        checkNicknameMutate(nickname);
    }

    const handleNicknameChange = (e) => {
        setNickname(e.target.value)
        setChecked(false)
        setError({ ...error, nickname: "" })
        setInputStatus((prev) => ({ ...prev, nickname: false }))
    }

    return (
        <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="nickname">
                닉네임
            </label>

            <div className={styles.nicknameInputGroup}>
                <input
                    id="nickname"
                    type="text"
                    className={styles.nicknameInput}
                    value={nickname}
                    onChange={handleNicknameChange}
                    placeholder="닉네임을 입력하세요 (최대 6자)"
                    maxLength={6}
                />
                <button type="button" className={styles.checkButton} onClick={handleNicknameCheckClick}>
                    중복 확인
                </button>
            </div>

            {/* 상태 메시지 */}
            {error.nickname && (
                <div className={styles.statusIndicator}>
                    <div className={`${styles.statusIcon} ${styles.statusIconError}`}>!</div>
                    <span className={styles.errorMessage}>{error.nickname}</span>
                </div>
            )}

            {isChecked && !error.nickname && (
                <div className={styles.statusIndicator}>
                    <div className={`${styles.statusIcon} ${styles.statusIconSuccess}`}>✓</div>
                    <span className={styles.successMessage}>사용 가능한 닉네임입니다.</span>
                </div>
            )}
        </div>
    )
}

export default NicknameForm