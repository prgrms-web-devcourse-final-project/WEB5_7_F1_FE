import {useNavigate} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import LoginLayout from "./LoginLayout";
import mainLogo from "../../assets/images/main-logo-rect.png"

const Login = () => {
    const navigate = useNavigate();

    return (
        <LoginLayout>
            <div>
                <Image src={mainLogo} width={"100%"} height={"50%"} />
            </div>
            <div className="kw-login-button mt-4">
                <Button variant={"primary"} onClick={() => navigate('/signup')}>뇌피셜 입장하기</Button>
            </div>
        </LoginLayout>
    );
}

export default Login;