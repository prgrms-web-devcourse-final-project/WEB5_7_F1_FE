import {Button, Form, Stack} from "react-bootstrap";
import {useMutation} from "react-query";
import axios from "axios";
import {useState} from "react";
import Spinner from "../../shared/Spinner";
import useConfirm from "../../hooks/useConfirm";
import {isEmptyOrNull} from "../../utils/utils";

const NicknameForm = ({nickname, setNickname, error, setError, setInputStatus}) => {
    const [isChecked, setChecked] = useState(false);
    const isValid = (value) => {
        const trimmed = value.trim();
        const regex = /^[가-힣a-zA-Z0-9]+$/; // 한글, 영문, 숫자만
        const length = Array.from(trimmed).length; // 유니코드 기준 글자 수 계산 (한글 1자씩 카운트)

        return regex.test(trimmed) && length >= 1 && length <= 6;
    };

    const handleNicknameCheckClick = () => {
        setChecked(false);
        setInputStatus(prev => ({ ...prev, nickname: false }));
        if (isEmptyOrNull(nickname)) {
            setError({ ...error, nickname: "닉네임을 먼저 입력해 주세요." });
            return;
        }
        if (!isValid(nickname)) {
            setError({ ...error, nickname: "한글,영문,숫자로 6자 이하만 가능합니다." });
            return;
        }
        //중복 api 호출 부분
        setChecked(true);
    }

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setChecked(false);
        setError({ ...error, nickname: '' })
        setInputStatus(prev => ({ ...prev, nickname: false }));
    }

    return (
        <Form.Group controlId={"forNickname"} >
            <Stack direction={"horizontal"} gap={4}>
                <Form.Label>닉네임</Form.Label>
                {error.nickname && <Form.Label style={{ color: 'red', fontSize: "13px" }}>{error.nickname}</Form.Label>}
                {isChecked && <Form.Label style={{ color: 'blue', fontSize: "13px" }}>{'사용 가능한 별명입니다.'}</Form.Label>}
            </Stack>
            <div className={"d-flex gap-2"} >
                <Form.Control
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                />
                <Button type={"button"} variant={"dark"} onClick={handleNicknameCheckClick} >중복 확인</Button>
            </div>
        </Form.Group>
    );
}

export default NicknameForm;