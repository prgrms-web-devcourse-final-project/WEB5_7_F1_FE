import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import QuizCard from "./QuizCard";
import QuizDetailModal from "./QuizDetailModal";
import {useNavigate} from "react-router-dom";
import PaginationNavigator from '../../layout/PaginationNavigator.js';
import styles from './quiz.module.scss'
import QuizSearchSelect from "./QuizSearchSelect";
import {useApiQuery} from "../../hooks/useApiQuery";
import axios from "axios";
import {isEmptyOrNull} from "../../utils/utils";

const options = [
    { value: 'title', label: '제목' },
    { value: 'creator', label: '제작자' },
];

const quizRequest = async (params = {}) => {
    const response = await axios.get('/quizzes', { params });
    return response.data;
};

const QuizList = () => {
    const [keyword, setKeyword] = useState("");
    const [selectedSearchType, setSelectedSearchType] = useState({ value: 'title', label: '제목' });
    const [quizDetailModalOpen, setQuizDetailModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [queryParams, setQueryParams] = useState({
        page: 1,
        size: 8,
        title: '',
        creator: '',
    });
    const { data, refetch } = useApiQuery(
        ['quizList', queryParams],
        () => quizRequest(queryParams),
        {
            keepPreviousData: true,
            staleTime: 1000 * 60 * 5,
        }
    );

    const navigate = useNavigate();

    // 검색 기능 구현
    const handleSearch = () => {
        if (isEmptyOrNull(keyword.trim())) { return; }
        if (selectedSearchType.value === 'title') {
            setQueryParams({ title: keyword, page: 1, size: 8, creator: '' });
        } else {
            setQueryParams({ title: '', page: 1, size: 8, creator: keyword });
        }
    };

    // 검색 버튼 클릭 이벤트
    const handleSearchClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSearch();
    };

    // 엔터키 이벤트 처리
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    // 퀴즈 카드 클릭 이벤트
    const handleQuizCardClick = (quiz) => {
        setSelectedQuiz(quiz);
        setQuizDetailModalOpen(true);
    };

    // 검색 타입 변경 이벤트
    const handleSearchTypeChange = (selectedOption) => {
        console.log(selectedOption)
        setSelectedSearchType(selectedOption);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setQueryParams({ ...queryParams, page: pageNumber });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Container fluid className="px-4">
            {/* 검색 영역과 퀴즈 생성 버튼 */}
            <div className="d-flex justify-content-center align-items-start mb-4 gap-3">
                {/* 검색 영역 */}
                <div style={{ width: "700px" }}>
                    <Form onSubmit={handleSearchClick}>
                        <div className="d-flex gap-3 align-items-center">
                            <div style={{ width: "200px" }}>
                                <QuizSearchSelect options={options}
                                                  value={selectedSearchType}
                                                  onChange={handleSearchTypeChange}
                                />
                            </div>
                            <Form.Control
                                type="text"
                                placeholder="검색어를 입력하세요..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={`flex-fill ${styles.searchInput}`}
                            />
                            <Button variant="danger" type="submit" className={`${styles.buttonBase} ${styles.searchButton}`}>
                                검색
                            </Button>
                        </div>
                    </Form>
                </div>

                {/* 퀴즈 생성 버튼 */}
                <Button variant="warning" onClick={() => navigate('create')} className={`${styles.buttonBase} ${styles.createButton}`}>
                    퀴즈 생성하기
                </Button>
            </div>

            {/* 퀴즈 목록 정보 - 검색 결과가 있을 때만 표시 */}
            {data?.totalElements > 0 && (
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted small">
                            페이지 <span className="text-primary fw-bold">{data?.currentPage}</span> / {data?.totalPages}
                        </div>
                    </div>
                </div>
            )}

            {/* 퀴즈 카드 그리드 */}
            {data?.quiz.length > 0 ? (
                <div className="mb-5">
                    {data?.quiz.reduce((rows, _, index, arr) => {
                        if (index % 4 === 0) {
                            rows.push(arr.slice(index, index + 4));
                        }
                        return rows;
                    }, []).map((rowItems, rowIndex) => (
                        <Row key={rowIndex} className="mb-4 g-4 justify-content-center">
                            {rowItems.map((quiz, colIndex) => (
                                <Col key={colIndex} xl={3} lg={4} md={6} sm={12} className="d-flex justify-content-center">
                                    <QuizCard 
                                        quiz={quiz}
                                        onClick={() => handleQuizCardClick(quiz)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: '80px', height: '80px' }}>
                            <i className="fas fa-search fa-2x text-muted"></i>
                        </div>
                    </div>
                    <h4 className="text-muted mb-3">검색 결과가 없습니다</h4>
                    <p className="text-muted mb-4">다른 검색어를 사용해보세요.</p>
                    <Button 
                        variant="outline-primary" 
                        onClick={() => {
                            setQueryParams({ title: '', page: 1, size: 8, creator: '' });
                        }}
                        style={{
                            height: '44px',
                            minWidth: '120px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '14px'
                        }}
                    >
                        전체 퀴즈 보기
                    </Button>
                </div>
            )}
                  <PaginationNavigator
                currentPage={data?.currentPage}
                totalPages={data?.totalPages}
                onPageChange={handlePageChange}
                />

            {/* 퀴즈 상세 모달 */}
            <QuizDetailModal 
                isOpen={quizDetailModalOpen} 
                onClose={() => setQuizDetailModalOpen(false)}
                quiz={selectedQuiz}
            />
        </Container>
    );
};

export default QuizList;