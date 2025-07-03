import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {isEmptyOrNull} from "../../utils/utils";
import Spinner from "../../shared/Spinner";
import useConfirm from "../../hooks/useConfirm";
import axios from "axios";
import {Button, Form, Image} from "react-bootstrap";
import LoginLayout from "./LoginLayout";
import {useMutation} from "react-query";
import mainLogo from "../../assets/images/main-logo.png"

const Login = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { openConfirm } = useConfirm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordViewToggle, setPasswordViewToggle] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const handleLoginRememberChange = (e) => {
        const checked = e.target.checked;
        setRememberMe(checked);
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        if (isEmptyOrNull(email)) {
            setError({ ...error, email: '이메일을 입력해주세요.' })
            return false;
        }

        if (isEmptyOrNull(password)) {
            setError({ ...error, password: '비밀번호를 입력해주세요.' })
            return false;
        }
        setError({ email: '', password: '' })
        loginMutation.mutate({email, password, rememberMe});
    }

    const loginMutation = useMutation((sendData) => axios.post('/api/v1/auth/login', sendData, {skipAuthInterceptor: true}), {
        onSuccess: (response) => {
            navigate('/main');
        }
        , onError: (error) => {
            console.log(error)
            openConfirm({
                title: '처리 중 오류가 발생했습니다.',
                html: error.response?.data?.message || "에러: 관리자에게 문의바랍니다."
            });
        }
    });

    // 소셜 로그인 결과 처리
    useEffect(() => {
        const authStatus = searchParams.get('auth_status');
        const authInfo = searchParams.get('info');
        
        if (authStatus === 'success') {
            navigate('/main');
        } else if (authInfo === 'auth_info') {
            openConfirm({
                title: '로그인 처리 중 오류가 발생했습니다.',
                html: '다시 시도해주세요.',
                showCancelButton: false
            });
        }
    }, [searchParams, navigate, openConfirm]);

    return (
        <LoginLayout>
                <div>
                    <Image src={mainLogo} width={"100%"} height={"50%"} />
                </div>
                <div className="kw-login-button">
                    <Button variant={"primary"} onClick={() => navigate('/signup')}>뇌피셜 입장하기</Button>
                </div>
            <Spinner show={loginMutation.isLoading} />
        </LoginLayout>
    );
}

export default Login;