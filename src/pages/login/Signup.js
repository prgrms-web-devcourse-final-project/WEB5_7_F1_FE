import {Button, Form, Stack} from "react-bootstrap";
import useConfirm from "../../hooks/useConfirm";
import {useState} from "react";
import ProfileImageZone from "./ProfileImageZone";
import LoginLayout from "./LoginLayout";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import NicknameForm from "./NicknameForm";
import {useMutation} from "react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import NameForm from "./NameForm";
import PhoneForm from "./PhoneForm";
import AddressForm from "./AddressForm";
import Spinner from "../../shared/Spinner";
import DetailAdrForm from "./DetailAdrForm";

const Signup = () => {
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState({
        nickname: '',
    })
    const [inputStatus, setInputStatus] = useState({
        nickname: false,
    })
    const navigate = useNavigate();

    const handleSignupClick = (e) => {
        e.preventDefault();
        if (nickname.length === 0) {
            setError({ ...error, nickname: '별명을 입력하세요.' });
            window.scrollTo(0, 500);
            return;
        }
    }

    return (
        <LoginLayout>
            <Form className="kw-login-input gap-2" onSubmit={handleSignupClick}>
                <NicknameForm nickname={nickname} setNickname={setNickname} error={error} setError={setError} setInputStatus={setInputStatus} />
                <Stack direction={"horizontal"} gap={4}>
                    <Button type="submit" variant={"outline-dark"} className={"text-black w-100 no-hover"}
                    onClick={() => navigate('/room/list')}>회원 가입 완료</Button>
                    <Button type="button" variant={"primary"} className={"w-100"}>취소</Button>
                </Stack>
            </Form>
        </LoginLayout>
    );
}

export default Signup;