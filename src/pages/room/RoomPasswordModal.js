"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./room.module.scss"

const RoomPasswordModal = ({ isOpen, onClose, onSave, roomTitle = "비밀방" }) => {
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.trim()) {
      // 비밀번호 검증 로직 (실제로는 서버에서 검증)
      console.log("입력된 비밀번호:", password)

      // onSave 콜백이 있으면 호출
      if (onSave) {
        onSave(password)
      }

      // 방으로 이동
      navigate("/room/1")
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && password.trim()) {
      handleSubmit(e)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.passwordModal}>
        <div className={styles.passwordModalHeader}>
          <h2 className={styles.passwordModalTitle}>🔒 비밀방 입장</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.passwordModalBody}>
            <div className={styles.passwordInputGroup}>
              <label className={styles.passwordLabel} htmlFor="roomPassword">
                🔑 방 비밀번호
              </label>
              <input
                id="roomPassword"
                type="password"
                className={styles.passwordInput}
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                placeholder="비밀번호를 입력하세요"
                autoFocus
              />
            </div>

            <div className={styles.passwordHint}>방장이 설정한 비밀번호를 입력해주세요</div>
          </div>

          <div className={styles.passwordModalFooter}>
            <button type="button" className={`${styles.modalButton} ${styles.cancelButton}`} onClick={onClose}>
              취소
            </button>
            <button type="submit" className={styles.enterButton} disabled={!password.trim()}>
              입장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoomPasswordModal