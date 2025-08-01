import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import QuizItem from "./QuizItem";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faImage,
    faListUl,
    faPlus,
    faSave,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";
import axios from "axios";
import {useApiMutation} from "../../hooks/useApiMutation";
import Spinner from "../../shared/Spinner";

const createQuizRequest = async ({ jsonData, thumbnailFile }) => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
    formData.append('thumbnailFile', thumbnailFile); // 이미지 파일
    const response = await axios.post('/quizzes', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

const CreateQuiz = () => {
    const [quizImageFile, setQuizImageFile] = useState(null);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const navigate = useNavigate();
    const { openConfirm } = useConfirm();
    const [items, setItems] = useState([
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
        { content: '', answer: '' },
    ]);

    const { mutate: createQuizMutate, isLoading } = useApiMutation(createQuizRequest, {
        onSuccess: (data) => {
            console.log('퀴즈 생성 성공:', data);
            openConfirm({
                title: '저장이 완료되었습니다.',
                callback: () => navigate('/quiz'),
                showCancelButton: false
            })
        },
    });

    const handleQuizItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleQuizItemAdd = () => {
        setItems([...items, { content: '', answer: '' }]);
    };

    const handleQuizItemRemove = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const isAllInputsFilled = items.length >= 10 && items.every(
        (item) => item.content.trim() !== '' && item.answer.trim() !== ''
    );

    const handleSaveClick = () => {
        // 공백 제거된 문자열 기준
        const trimmedTitle = quizTitle.trim();
        const trimmedDescription = quizDescription.trim();

        // 제목 길이 확인
        if (trimmedTitle.length < 2 || trimmedTitle.length > 30) {
            openConfirm({title: '제목은 공백 제외 2~30자 사이여야 합니다.'});
            return;
        }

        // 설명 길이 확인
        if (trimmedDescription.length < 10 || trimmedDescription.length > 50) {
            openConfirm({title: '설명은 공백 제외 10~50자 사이여야 합니다.'});
            return;
        }

        // 퀴즈 수 확인
        if (items.length < 10 || items.length > 80) {
            openConfirm({title: '퀴즈는 최소 10개, 최대 80개까지 등록할 수 있습니다.'});
            return;
        }

        // 각 문제의 길이와 정답 길이 확인
        for (let i = 0; i < items.length; i++) {
            const { content, answer } = items[i];
            const trimmedContent = content.trim();
            const trimmedAnswer = answer.trim();

            if (trimmedContent.length < 5 || trimmedContent.length > 30) {
                openConfirm({title: `문제 ${i + 1}의 내용은 공백 제외 5~30자 사이여야 합니다.`});
                return;
            }

            if (trimmedAnswer.length < 1 || trimmedAnswer.length > 30) {
                openConfirm({title: `문제 ${i + 1}의 정답은 공백 제외 1~30자 사이여야 합니다.`});
                return;
            }
        }

        // 모든 조건 통과 시 API 호출
        const jsonData = {
            title: trimmedTitle,
            quizType: 'TEXT',
            description: trimmedDescription,
            questions: items.map(({ content, answer }) => ({
                content: content.trim(),
                answer: answer.trim(),
            })),
        };

        createQuizMutate({
            jsonData,
            thumbnailFile: quizImageFile
        });
    }

    const f1Styles = {
        container: {
          backgroundColor: '#f5f5f5', // ✅ 밝은 전체 배경
          color: '#222222',
          minHeight: '100vh',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
          position: 'relative',
        },
        header: {
          borderBottom: '2px solid #e10600',
          paddingBottom: '1rem',
          marginBottom: '2rem',
        },
        card: {
          backgroundColor: '#ffffff', // ✅ 카드도 밝게!
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          padding: '1.5rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)', // 부드러운 그림자
        },
        input: {
          backgroundColor: '#ffffff', // ✅ 입력칸도 흰색
          border: '1px solid #ccc',
          borderRadius: '6px',
          color: '#222',
          padding: '0.75rem',
          fontSize: '1rem',
        },
        inputFocus: {
          borderColor: '#e10600',
          boxShadow: '0 0 0 3px rgba(225, 6, 0, 0.15)',
          outline: 'none',
        },
        questionHeader: {
          backgroundColor: '#f0f0f0', // ✅ 질문영역도 밝게
          padding: '1rem',
          borderRadius: '10px 10px 0 0',
          borderBottom: '2px solid #e10600',
        },
        scrollArea: {
          maxHeight: '65vh',
          overflowY: 'auto',
          paddingRight: '0.5rem',
        },
        sectionTitle: {
          color: '#333',
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        },
        primaryButton: {
          backgroundColor: '#e10600',
          border: 'none',
          borderRadius: '6px',
          color: '#ffffff',
          fontWeight: '600',
          padding: '0.75rem 1.5rem',
          textTransform: 'uppercase',
          fontSize: '0.9rem',
        },
        secondaryButton: {
          backgroundColor: '#ffffff',
          border: '1px solid #ccc',
          color: '#333',
          fontWeight: '500',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          fontSize: '0.9rem',
        },
        badge: {
          backgroundColor: '#e10600',
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          border: 'none',
        },
      };
      

    return (
        <div style={f1Styles.container}>
            <Spinner show={isLoading} />
            <div className="container-fluid p-4" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{...f1Styles.header, position: 'relative', zIndex: 2}}>
                    <h1 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#e10600' }}>
                        퀴즈 생성
                    </h1>
                    <p className="mb-0 mt-2" style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>
                        최고의 퀴즈 경험을 만들어보세요
                    </p>
                </div>

                <Row className="g-4 h-100">
                    {/* Left Panel - Quiz Info */}
                    <Col lg={4}>
                        <div className="d-flex flex-column h-100">
                            {/* Quiz Title */}
                            <div className="mb-4">
                                <div style={f1Styles.card}>
                                    <div style={f1Styles.sectionTitle}>
                                        <FontAwesomeIcon icon={faListUl} className="me-2" />
                                        퀴즈 제목
                                    </div>
                                    <Form.Control
                                        type="text"
                                        placeholder="퀴즈 제목을 입력하세요."
                                        value={quizTitle}
                                        onChange={(e) => setQuizTitle(e.target.value)}
                                        style={f1Styles.input}
                                        onFocus={(e) => Object.assign(e.target.style, f1Styles.inputFocus)}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#38384a';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Quiz Description */}
                            <div className="mb-4">
                                <div style={f1Styles.card}>
                                    <div style={f1Styles.sectionTitle}>
                                        퀴즈 설명
                                    </div>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="퀴즈 설명을 입력하세요."
                                        value={quizDescription}
                                        onChange={(e) => setQuizDescription(e.target.value)}
                                        style={f1Styles.input}
                                        onFocus={(e) => Object.assign(e.target.style, f1Styles.inputFocus)}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#38384a';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Quiz Image */}
                            <div>
                                <div style={f1Styles.card}>
                                    <div style={f1Styles.sectionTitle}>
                                        <FontAwesomeIcon icon={faImage} className="me-2" />
                                        퀴즈 이미지
                                    </div>
                                    {quizImageFile && (
                                        <div className="mb-3">
                                            <img 
                                                src={URL.createObjectURL(quizImageFile)} 
                                                alt="Quiz thumbnail" 
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    border: '1px solid #38384a'
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="d-flex gap-2">
                                        <Button 
                                            style={f1Styles.secondaryButton}
                                            onClick={() => document.getElementById('imageInput').click()}
                                            className="flex-grow-1"
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#38384a';
                                                e.target.style.borderColor = '#e10600';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.borderColor = '#38384a';
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faImage} className="me-2" />
                                            {quizImageFile ? '이미지 변경' : '이미지 업로드'}
                                        </Button>
                                        {quizImageFile && (
                                            <Button 
                                                style={{...f1Styles.secondaryButton, color: '#e10600'}}
                                                onClick={() => setQuizImageFile(null)}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#38384a';
                                                    e.target.style.borderColor = '#e10600';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.borderColor = '#38384a';
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </Button>
                                        )}
                                    </div>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setQuizImageFile(file);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right Panel - Questions */}
                    <Col lg={8}>
                        <div style={f1Styles.card} className="h-100 d-flex flex-column">
                            {/* Questions Header */}
                            <div style={f1Styles.questionHeader}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="mb-0" style={{ color: 'black', fontWeight: '600' }}>
                                        문제 목록
                                    </h3>
                                    <span style={f1Styles.badge}>
                                        {items.length} / 80
                                    </span>
                                </div>
                            </div>

                            {/* Questions Grid Header */}
                            <div className="row py-3" style={{ backgroundColor: '#252538', margin: '0' }}>
                                <div className="col-6 text-center">
                                    <strong style={{ color: '#e10600', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                        질문
                                    </strong>
                                </div>
                                <div className="col-6 text-center">
                                    <strong style={{ color: '#e10600', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                        정답
                                    </strong>
                                </div>
                            </div>

                            {/* Questions List */}
                            <div style={f1Styles.scrollArea} className="flex-grow-1 py-3">
                                <Stack gap={3}>
                                    {items.map((item, index) => (
                                        <QuizItem
                                            key={index}
                                            index={index}
                                            content={item.content}
                                            answer={item.answer}
                                            onChange={handleQuizItemChange}
                                            onRemove={handleQuizItemRemove}
                                        />
                                    ))}
                                </Stack>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-3 mt-auto" style={{ borderTop: '1px solid #38384a' }}>
                                <div className="d-flex justify-content-center mb-3">
                                    <Button 
                                        style={f1Styles.secondaryButton}
                                        onClick={handleQuizItemAdd}
                                        disabled={items.length >= 80}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#38384a';
                                            e.target.style.borderColor = '#e10600';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.borderColor = '#38384a';
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                                        질문 추가
                                    </Button>
                                </div>
                                
                                <Row className="g-3">
                                    <Col>
                                        <Button 
                                            style={f1Styles.primaryButton}
                                            className="w-100"
                                            disabled={!isAllInputsFilled} 
                                            onClick={handleSaveClick}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#c10500';
                                                e.target.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#e10600';
                                                e.target.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faSave} className="me-2" />
                                            저장
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            style={f1Styles.secondaryButton}
                                            className="w-100"
                                            onClick={() => navigate('/quiz')}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#38384a';
                                                e.target.style.borderColor = '#e10600';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.borderColor = '#38384a';
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                                            취소
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CreateQuiz;