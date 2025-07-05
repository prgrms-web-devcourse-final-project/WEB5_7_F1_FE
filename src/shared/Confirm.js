import {Button, Modal} from "react-bootstrap";
import {useRecoilState} from "recoil";
import {confirmAtom} from "../state/atoms";

const Confirm = () => {
    const [confirmState, setConfirmState] = useRecoilState(confirmAtom);

    const handleClose = () => {
        setConfirmState({ ...confirmState, isOpen: false });
    };

    const handleConfirm = () => {
        if (confirmState.callback) {
            confirmState.callback(); // 콜백 함수 실행
        }
        handleClose();
    };

    return (
        <Modal
            show={confirmState.isOpen}
            centered
            backdrop="static" // 백그라운드 클릭 시 닫히지 않도록
        >
            <Modal.Body>
                <div className="pt-8 pb-8 text-center">
                    <i className={`ico-${confirmState.icon}`}></i>
                    <p className="m-0 mt-6 mb-3 fs-16">
                        <strong>
                            {confirmState.title}
                        </strong>
                        <br/>
                        {confirmState.html}
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-7 mb-4">
                        <Button onClick={handleConfirm}>
                            {confirmState.confirmButtonText}
                        </Button>
                        {/* callback 함수가 없으면 단순 정보성 Alert로 인식하여 별도의 취소버튼을 두지 않는다. */}
                        {confirmState.callback && confirmState.showCancelButton ?
                            <Button variant={"outline-primary"} onClick={handleClose}>
                                취소
                            </Button> : null}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Confirm;