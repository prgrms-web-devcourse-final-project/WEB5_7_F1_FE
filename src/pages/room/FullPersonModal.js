"use client"

import styles from "./room.module.scss"

const FullPersonModal = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.alertModal}>
        <div className={styles.alertModalBody}>
          <div className={styles.alertIcon}>🚫</div>
          <p className={styles.alertMessage}>정원이 모두 찼습니다</p>
          <p className={styles.alertSubMessage}>다른 방을 선택하거나 잠시 후 다시 시도해주세요</p>
        </div>

        <div className={styles.alertModalFooter}>
          <button className={styles.alertButton} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default FullPersonModal