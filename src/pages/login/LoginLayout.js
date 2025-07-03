import {Button, Card, Stack} from "react-bootstrap";
import arrowLeft from "../../assets/images/icon/arrow-left.png";
import logo from "../../assets/images/tung.png";
import {useLocation, useNavigate} from "react-router-dom";
import clsx from "clsx";

const LoginLayout = ({ children }) => {
    return (
        <>
            <div className="kw-login">
                <div className="kw-login-form">
                    {children}
                </div>
            </div>
        </>
    );
}

export default LoginLayout;