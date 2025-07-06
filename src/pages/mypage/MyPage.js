import styles from './mypage.module.scss';
import {useState} from "react";
import {Button, Form, Stack} from "react-bootstrap";
import useConfirm from "../../hooks/useConfirm";
import {useNavigate} from "react-router-dom";

const MyPage = () => {
    const [nickname, setNickname] = useState('빵야빵야');
    const { openConfirm } = useConfirm();
    const navigate = useNavigate();

    const handleExitClick = () => {
        openConfirm({
            title: "탈퇴 확인",
            html: <div>정말 탈퇴하시겠어요?<br/>탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다. </div>,
            confirmButtonText: '탈퇴',
            callback: () => navigate('/login')
        })
    }

    return (
        <div className={styles.borderbox}>
            <Form>
                {/* 닉네임 */}
                <Stack direction="horizontal" gap={2} className="mb-4">
                    <strong style={{ width: '100px' }}>닉네임</strong>
                    <Form.Control
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        style={{ maxWidth: '200px' }}
                    />
                    <Button>중복 체크</Button>
                </Stack>
                {/* 전적, 점수, 랭킹 */}
                <Stack gap={2} className="mb-4">
                    <Stack direction="horizontal" gap={15}>
                        <strong style={{ width: '100px' }}>전적</strong>
                        <span>50전 30승 20패</span>
                    </Stack>
                    <Stack direction="horizontal" gap={15}>
                        <strong style={{ width: '100px' }}>점수</strong>
                        <span>70점</span>
                    </Stack>
                    <Stack direction="horizontal" gap={15}>
                        <strong style={{ width: '100px' }}>현재 랭킹</strong>
                        <span>3위</span>
                    </Stack>
                </Stack>
                {/* 버튼 영역 */}
                <Stack direction="horizontal" gap={10} className={"justify-content-center"}>
                    <Button variant="outline-primary">변경사항 저장</Button>
                    <Button variant="danger" onClick={handleExitClick}>회원탈퇴</Button>
                </Stack>
            </Form>
        </div>
    );
}

export default MyPage;