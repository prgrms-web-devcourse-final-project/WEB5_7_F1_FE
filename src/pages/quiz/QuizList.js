import styles from "../room/room.module.scss";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import ThemedSelect from "../../shared/ThemedSelect";
import {useState} from "react";
import QuizCard from "./QuizCard";
import QuizDetailModal from "./QuizDetailModal";
import {useNavigate} from "react-router-dom";

const options = [
    { value: 'title', label: '제목' },
    { value: 'creator', label: '제작자' },
];

const quizCardList = [
    { id: 1, title: '겜할 사람 급구 ㄱ1' },
    { id: 2, title: '겜할 사람 급구 ㄱ2' },
    { id: 3, title: '겜할 사람 급구 ㄱ3' },
    { id: 4, title: '겜할 사람 급구 ㄱ4' },
    { id: 5, title: '겜할 사람 급구 ㄱ5' },
    { id: 6, title: '겜할 사람 급구 ㄱ6' },
    { id: 7, title: '겜할 사람 급구 ㄱ7' },
    { id: 8, title: '겜할 사람 급구 ㄱ8' },
]; // 필요 시 실제 데이터로 교체

const QuizList = () => {
    const [keyword, setKeyword] = useState("");
    const [quizDetailModalOpen, setQuizDetailModalOpen] = useState();
    const navigate = useNavigate();

    // 버튼 클릭 이벤트 처리
    const handleSearchClick = (e) => {
        console.log("🔍 검색 버튼 클릭됨"); // 디버깅용 로그
        e.preventDefault();
        e.stopPropagation();
    }

    // 엔터키 이벤트 처리
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("🔍 엔터키 눌림"); // 디버깅용 로그
            handleSearchClick(e);
        }
    }
    return (
        <>
            <Stack direction={"horizontal"} className={"justify-content-center mx-10 mt-10"}>
                <div className={styles.borderbox} style={{ width: "500px" }}>
                    <Form>
                        <Stack direction={"horizontal"} gap={5} className={"m-3"}>
                            <ThemedSelect options={options} defaultValue={{ value: 'title', label: '제목' }}/>
                            <Form.Control
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <Button>찾기</Button>
                        </Stack>
                    </Form>
                </div>
            </Stack>
            <Button variant={"warning"} className={"ms-auto me-10 text-black"} onClick={() => navigate('create')}>퀴즈 생성하기</Button>
            {quizCardList.reduce((rows, _, index, arr) => {
                if (index % 4 === 0) {
                    rows.push(arr.slice(index, index + 4)); // 2개씩 묶기
                }
                return rows;
            }, [])
            .map((rowItems, rowIndex) => (
                <Row key={rowIndex} className="m-10">
                    {rowItems.map((item, colIndex) => (
                        <Col key={colIndex} md={3} className="d-flex justify-content-center">
                            <QuizCard onClick={() => setQuizDetailModalOpen(true)}/>
                        </Col>
                    ))}
                </Row>
            ))}
            <QuizDetailModal isOpen={quizDetailModalOpen} onClose={() => setQuizDetailModalOpen(false)} />
        </>
    );
}

export default QuizList;