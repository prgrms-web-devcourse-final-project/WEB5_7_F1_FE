import {Button, Modal, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";

const QuizDetailModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { openConfirm } = useConfirm();

    const handleDeleteQuizClick = () => {
        openConfirm({
            title: '삭제하시겠습니까?',
            callback: () => {}
        })
    }

    return (
        <Modal show={isOpen} centered backdrop="static"  >
            <Modal.Header closeButton onHide={onClose}>
                <Modal.Title>[퀴즈 제목]</Modal.Title>
                <span>총 문제 수 : N (개)</span>
            </Modal.Header>
            <Modal.Body>
                <div>퀴즈 설명</div>
                <div>퀴즈 썸네일</div>
            </Modal.Body>
            <Modal.Footer className={"justify-content-between"}>
                <span>퀴즈 제작자: 닉네임</span>
                <Stack direction={"horizontal"} gap={3}>
                    <Button onClick={() => navigate('1/edit')}>퀴즈 수정</Button>
                    <Button variant={"outline-primary"} onClick={handleDeleteQuizClick}>퀴즈 삭제</Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
}

export default QuizDetailModal;