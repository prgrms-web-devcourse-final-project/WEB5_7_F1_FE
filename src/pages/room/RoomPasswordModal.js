import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const RoomPasswordModal = ({ isOpen, onClose, onSave }) => {
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <Modal show={isOpen} centered backdrop="static"  >
            <Modal.Header closeButton onHide={onClose}>
                <Modal.Title>방 제목</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId={"forRoomPassword"} >
                    <Form.Label>방 비밀번호</Form.Label>
                    <Form.Control
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className={"d-flex justify-content-center"}>
                <Button onClick={() => navigate('/room/1')}>입장</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RoomPasswordModal;