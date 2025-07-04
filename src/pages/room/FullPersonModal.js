import {Button, Form, Modal} from "react-bootstrap";

const FullPersonModal = ({ isOpen, onClose }) => {
    return (
        <Modal show={isOpen} centered backdrop="static"  >
            <Modal.Body className={"text-center"}>
                정원이 모두 찼습니다.
            </Modal.Body>
            <Modal.Footer className={"d-flex justify-content-center"}>
                <Button onClick={onClose}>확인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FullPersonModal;