import {Button, Form, Modal, Stack} from "react-bootstrap";
import {useState} from "react";
import ThemedSelect from "../../shared/ThemedSelect";
import {useNavigate} from "react-router-dom";

const options = [
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
];

const CreateRoomModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState();
    const [personCount, setPersonCount] = useState();
    const [isSecret, setSecret] = useState(false);
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleIsSecretChange = (e) => {
        const checked = e.target.checked;
        setSecret(checked);
        if (!checked) {
            setPassword(''); // 체크 해제 시 초기화 (선택사항)
        }
    };

    return (
        <Modal show={isOpen} centered backdrop="static"  >
            <Modal.Header closeButton onHide={onClose}>
                <Modal.Title>방 만들기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3}>
                    <Form.Group controlId={"forRoomTitle"} >
                        <Form.Label>방 제목</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId={"forPersonCount"} >
                        <Form.Label>방 인원</Form.Label>
                        <ThemedSelect options={options} defaultValue={{ value: '2', label: '2' }} />
                    </Form.Group>
                    <Form.Group controlId="forUsePassword">
                        <Form.Check
                            type="checkbox"
                            label="비밀번호 사용"
                            checked={isSecret}
                            onChange={handleIsSecretChange}
                        />
                    </Form.Group>
                    <Form.Group controlId={"forRoomPassword"} >
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            disabled={!isSecret}
                        />
                    </Form.Group>
                </Stack>
            </Modal.Body>
            <Modal.Footer className={"d-flex justify-content-center"}>
                <Button onClick={onClose}>만들기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateRoomModal;