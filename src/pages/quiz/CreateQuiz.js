import {Button, Col, Row, Stack} from "react-bootstrap";
import QuizItem from "./QuizItem";
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from './quiz.module.scss'
import ImageZone from "../../shared/ImageZone";
import {useNavigate} from "react-router-dom";
import useConfirm from "../../hooks/useConfirm";

const CreateQuiz = () => {
    const [quizImageFile, setQuizImageFile] = useState(null);
    const navigate = useNavigate();
    const { openConfirm } = useConfirm();
    const [items, setItems] = useState([
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
        { input1: '', input2: '' },
    ]);

    const handleChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleAdd = () => {
        setItems([...items, { input1: '', input2: '' }]);
    };

    const handleRemove = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const isAllInputsFilled = items.length >= 10 && items.every(
        (item) => item.input1.trim() !== '' && item.input2.trim() !== ''
    );

    const handleSaveClick = () => {
        openConfirm({
            title: '저장이 완료되었습니다.',
            callback: () => navigate('/quiz'),
            showCancelButton: false
        })
    }

    return (
        <>
            <Row className={"h-100 m-5"}>
                <Col md={5}>
                    <Row className="flex-column h-100" style={{ gap: '1rem' }}>
                        <Col className="p-0" style={{ flex: '0 0 20%' }}>
                            <div className={`${styles.borderbox} h-100`}>퀴즈 제목</div>
                        </Col>
                        <Col className="p-0" style={{ flex: '0 0 20%' }}>
                            <div className={`${styles.borderbox} h-100`}>퀴즈 설명 추가</div>
                        </Col>
                        <Col className="p-0" style={{ flex: '0 0 50%' }}>
                            <div className={`${styles.borderbox} h-100`}>
                                <ImageZone handleImageChange={(file) => setQuizImageFile(file)} />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={7}>
                    <div style={{ minHeight: '500px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                        <h4>{`문제 개수 ${items.length} / 80 개`}</h4>
                        <div className={"my-2"} style={{ borderBottom: '2px solid #1a1a1a' }} />
                        <div>
                            <span style={{ marginLeft: "30%" }}>문제</span>
                            <span style={{ marginLeft: "40%" }}>정답</span>
                        </div>
                        <Stack gap={2} style={{ flex: 1, overflowY: 'scroll' }}>
                            {items.map((item, index) => (
                                <QuizItem
                                    key={index}
                                    index={index}
                                    input1={item.input1}
                                    input2={item.input2}
                                    onChange={handleChange}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </Stack>
                        <Button type={'button'} variant={"outline-primary"} className={"mx-4"} style={{ minHeight: "32px" }}
                                onClick={handleAdd} disabled={items.length >= 80}>
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                        <Stack direction="horizontal" gap={5} className={"mx-4 mt-4"}>
                            <Button className="w-50" disabled={!isAllInputsFilled} onClick={handleSaveClick}>완료</Button>
                            <Button variant={'outline-primary'} className="w-50" onClick={() => navigate('/quiz')}>취소</Button>
                        </Stack>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default CreateQuiz;