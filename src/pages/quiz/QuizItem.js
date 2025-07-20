import {Badge, Col, Form, Row} from "react-bootstrap";
import styles from './quiz.module.scss'

const QuizItem = ({ index, content, answer, onChange, onRemove }) => {
    return (
        <Row className={"m-2"}>
            <Col md={1} className={"d-flex align-items-center"}>
                <Badge bg={"danger"} className={`${styles.deleteBadge} `} onClick={() => onRemove(index)}>X</Badge>
            </Col>
            <Col md={6}>
                <Form>
                    <Form.Control
                        required
                        type="text"
                        placeholder="문제를 입력하세요"
                        value={content}
                        onChange={(e) => onChange(index, 'content', e.target.value)}
                    />
                </Form>
            </Col>
            <Col md={5}>
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="정답을 입력하세요"
                        value={answer}
                        onChange={(e) => onChange(index, 'answer', e.target.value)}
                    />
                </Form>
            </Col>
        </Row>
    );
}

export default QuizItem;