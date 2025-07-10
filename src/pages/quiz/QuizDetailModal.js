import {Button, Modal, Stack, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";

const QuizDetailModal = ({ isOpen, onClose, quiz }) => {
    const navigate = useNavigate();
    const { openConfirm } = useConfirm();

    const handleDeleteQuizClick = () => {
        openConfirm({
            title: <>
                    정말 해당 퀴즈를 삭제하시겠습니까?
                    <br />
                    한 번 삭제하면 복구할 수 없습니다.
                </>,
            callback: () => {}
        })
    }

    if (!quiz) return null;

    return (
        <Modal show={isOpen} centered backdrop="static">
            <Modal.Header closeButton onHide={onClose} className="border-0 pb-2">
                <div className="w-100 d-flex justify-content-between align-items-start">
                    <Modal.Title className="fw-bold text-dark fs-4">
                         {quiz.title} 
                    </Modal.Title>
                    <span className="text-muted">
                        총 문제 수 : {quiz.numberOfQuestion} (개)
                    </span>
                </div>
            </Modal.Header>
            
            <Modal.Body className="px-4 py-3">
                {/* 퀴즈 설명 박스 */}
                <div 
                    className="border rounded-3 p-4 mb-4 bg-light"
                    style={{
                        minHeight: '120px',
                        borderColor: '#dee2e6'
                    }}
                >
                    <div className="text-center text-muted mb-3 fw-medium">
                        퀴즈 설명
                    </div>
                    <div className="text-dark text-center">
                        {quiz.description}
                    </div>
                </div>

                {/* 퀴즈 썸네일 박스 */}
                <div 
                    className="border rounded-3 p-4 bg-light d-flex flex-column align-items-center justify-content-center"
                    style={{
                        minHeight: '200px',
                        borderColor: '#dee2e6'
                    }}
                >
                    <div className="text-center text-muted mb-3 fw-medium">
                        퀴즈 썸네일
                    </div>
                    {quiz.thumbnailUrl ? (
                        <Image 
                            src={quiz.thumbnailUrl} 
                            alt="퀴즈 썸네일"
                            className="rounded"
                            style={{
                                maxWidth: '150px',
                                maxHeight: '150px',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <div className="text-muted" style={{fontSize: '3rem'}}>
                            📄
                        </div>
                    )}
                </div>
            </Modal.Body>
            
            <Modal.Footer className="border-0 d-flex justify-content-between align-items-center pt-2">
                <span className="text-dark">
                    퀴즈 제작자 : {quiz.creatorName}
                </span>
                <Stack direction="horizontal" gap={3}>
                    <Button 
                        variant="outline-primary"
                        onClick={() => navigate(`${quiz.id}/edit`)}
                        className="px-4 py-2 fw-medium rounded-3"
                    >
                        퀴즈 수정
                    </Button>
                    <Button 
                        variant="dark" 
                        onClick={handleDeleteQuizClick}
                        className="px-4 py-2 fw-medium rounded-3"
                        style={{
                            backgroundColor: '#ff1e1e',
                            borderColor: '#ff1e1e'
                        }}
                    >
                        퀴즈 삭제
                    </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
}

export default QuizDetailModal;