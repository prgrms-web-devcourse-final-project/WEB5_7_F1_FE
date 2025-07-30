"use client"

import { useState } from "react"
import styles from "./room.module.scss"
import useConfirm from "../../hooks/useConfirm";

const CreateRoomModal = ({ isOpen, onClose, onSubmit }) => {
  const [roomName, setRoomName] = useState("")
  const [maxUserCount, setMaxUserCount] = useState("2")
  const [locked, setLocked] = useState(false)
  const [password, setPassword] = useState("");
  const {openConfirm} = useConfirm();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleIsSecretChange = (e) => {
    const checked = e.target.checked
    setLocked(checked)
    if (!checked) {
      setPassword("")
    }
  }

  const handleSubmit = () => {
    if (locked && !password.trim()) {
      openConfirm({
        title: "비밀번호를 입력 하세요"
      });
      return;
    }
    // 방 생성 로직
    onSubmit({ roomName, maxUserCount, locked, password });
    onClose();
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>방 만들기</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="roomTitle">
              방 제목
            </label>
            <input
              id="roomTitle"
              type="text"
              className={styles.formInput}
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="방 제목을 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="personCount">
              방 인원
            </label>
            <select
              id="personCount"
              className={styles.formSelect}
              value={maxUserCount}
              onChange={(e) => setMaxUserCount(e.target.value)}
            >
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">7명</option>
              <option value="8">8명</option>
            </select>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              id="usePassword"
              type="checkbox"
              className={styles.checkbox}
              checked={locked}
              onChange={handleIsSecretChange}
            />
            <label className={styles.checkboxLabel} htmlFor="usePassword">
              비밀번호 사용
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="roomPassword">
              비밀번호
            </label>
            <input
              id="roomPassword"
              type="password"
              className={styles.formInput}
              value={password}
              onChange={handlePasswordChange}
              disabled={!locked}
              placeholder={locked ? "비밀번호를 입력하세요" : "비밀번호 사용을 체크해주세요"}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={`${styles.modalButton} ${styles.cancelButton}`} onClick={onClose}>
            취소
          </button>
          <button className={styles.modalButton} onClick={handleSubmit}>
            만들기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateRoomModal