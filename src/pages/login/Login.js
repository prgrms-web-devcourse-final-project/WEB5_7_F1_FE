import { useNavigate } from "react-router-dom"
import mainLogo from "../../assets/images/main-logo-rect.png"
import styles from "./Login.module.scss"

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>
          <img src={mainLogo || "/placeholder.svg"} alt="뇌피셜 로고" className={styles.loginLogoImage} />
        </div>
        <button className={styles.loginButton}
                onClick={() => {
                  window.location.href = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/kakao`;
                }}>
          뇌이싱 입장하기
        </button>
      </div>
    </div>
  )
}

export default Login