import React from 'react';
import { Modal, Button, Image, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useConfirm from "../../hooks/useConfirm";
import {useApiMutation} from "../../hooks/useApiMutation";
import axios from "axios";
import Spinner from "../../shared/Spinner";
import {useRecoilValue} from "recoil";
import {loginUserAtom} from "../../state/atoms";

// 상대 경로 앞에 슬래시를 보장해 Public 기준에서 로드되도록 보정
const ensureLeadingSlash = (url) => {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url; // 절대 URL은 그대로 사용
    return url.startsWith('/') ? url : `/${url}`;
}

const deleteQuizRequest = async (quizId) => {
    return  await axios.delete(`/quizzes/${quizId}`);
}

const QuizDetailModal = ({ isOpen, onClose, quiz }) => {
    const navigate = useNavigate();
    const loginUser = useRecoilValue(loginUserAtom);
    console.log(quiz)
    const isEditable = loginUser?.name === quiz?.creatorNickname;
    const { openConfirm } = useConfirm();
    const { mutate: deleteQuizMutate, isLoading } = useApiMutation(deleteQuizRequest, {
        invalidateKeys: [['quizList']],
        onSuccess: () => {
            openConfirm({
                title: '삭제가 완료되었습니다.',
                callback: () => onClose(),
                showCancelButton: false
            })
        },
    });
    const handleDeleteQuizClick = () => {
        openConfirm({
            title: <>
                    정말 해당 퀴즈를 삭제하시겠습니까?
                    <br />
                    한 번 삭제하면 복구할 수 없습니다.
                </>,
            callback: () => deleteQuizMutate(quiz.quizId)
        })
    }

    if (!quiz) return null;

    return (
        <Modal show={isOpen} centered backdrop="static">
            <Spinner show={isLoading} />
            <Modal.Header closeButton onHide={onClose} className="border-0 pb-2">
                <div className="w-100 d-flex justify-content-between align-items-start">
                    <Modal.Title className="fw-bold text-dark fs-4">
                         {quiz.title} 
                    </Modal.Title>
                    <span className="text-muted fs-6">
                        총 문제 수 : {quiz.numberOfQuestion} (개)
                    </span>
                </div>
            </Modal.Header>
            
            <Modal.Body className="px-4 py-3">
                {/* 퀴즈 설명 박스 */}
                <div className="mb-4">
                    <div 
                        className="text-muted mb-2 fw-medium d-flex align-items-center"
                        style={{ fontSize: '0.9rem' }}
                    >
                        <span className="me-2">📝</span>
                        퀴즈 설명
                    </div>
                    <div 
                        className="border rounded-3 p-3 bg-white"
                        style={{
                            minHeight: '80px',
                            borderColor: '#e9ecef',
                            backgroundColor: '#f8f9fa !important'
                        }}
                    >
                        <div className="text-dark" style={{ lineHeight: '1.5' }}>
                            {quiz.description || '설명이 없습니다.'}
                        </div>
                    </div>
                </div>

                {/* 퀴즈 썸네일 박스 */}
                <div>
                    <div 
                        className="text-muted mb-2 fw-medium d-flex align-items-center"
                        style={{ fontSize: '0.9rem' }}
                    >
                        <span className="me-2">🖼️</span>
                        퀴즈 썸네일
                    </div>
                    <div 
                        className="border rounded-3 p-3 bg-white d-flex flex-column align-items-center justify-content-center"
                        style={{
                            minHeight: '160px',
                            borderColor: '#e9ecef',
                            backgroundColor: '#f8f9fa !important'
                        }}
                    >
                        {quiz.thumbnailUrl ? (
                            <Image 
                                src={ensureLeadingSlash(quiz.thumbnailUrl)} 
                                alt="퀴즈 썸네일"
                                className="rounded shadow-sm"
                                style={{
                                    maxWidth: '120px',
                                    maxHeight: '120px',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <div className="text-center">
                                <div className="text-muted mb-2" style={{fontSize: '2.5rem'}}>
                                    📄
                                </div>
                                <small className="text-muted">썸네일이 없습니다</small>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
            
            <Modal.Footer className="border-0 d-flex justify-content-between align-items-center pt-2">
                <div className="d-flex align-items-center">
                    <span className="text-muted me-2" style={{ fontSize: '0.9rem' }}>👤</span>
                    <span className="text-dark fw-medium">
                        {quiz.creatorNickname}
                    </span>
                </div>
                {isEditable && <Stack direction="horizontal" gap={2}>
                    <Button
                        variant="outline-primary"
                        onClick={() => navigate(`${quiz.quizId}/edit`)}
                        className="px-3 py-2 fw-medium rounded-3"
                        style={{ fontSize: '0.9rem' }}
                    >
                        수정
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteQuizClick}
                        className="px-3 py-2 fw-medium rounded-3"
                        style={{ fontSize: '0.9rem' }}
                    >
                        삭제
                    </Button>
                </Stack>}
            </Modal.Footer>
        </Modal>
    );
}

export default QuizDetailModal;