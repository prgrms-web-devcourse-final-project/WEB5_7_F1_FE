import {Button, Col, Form, Row, Stack, Container} from "react-bootstrap";
import ThemedSelect from "../../shared/ThemedSelect";
import {useState, useEffect} from "react";
import QuizCard from "./QuizCard";
import QuizDetailModal from "./QuizDetailModal";
import {useNavigate} from "react-router-dom";
import PaginationNavigator from '../../layout/PaginationNavigator.js';
import styles from './quiz.module.scss'
import QuizSearchSelect from "./QuizSearchSelect";

const options = [
    { value: 'title', label: '제목' },
    { value: 'creator', label: '제작자' },
];

const quizCardList = [
    { id: 1, title: '겜할 사람 급구 ㄱ1', description: '퀴즈에 대한 설명입니다.', creator: '닉네임1', totalQuestions: 80 },
    { id: 2, title: '겜할 사람 급구 ㄱ2', description: '퀴즈에 대한 설명입니다.', creator: '닉네임2', totalQuestions: 75 },
    { id: 3, title: '겜할 사람 급구 ㄱ3', description: '퀴즈에 대한 설명입니다.', creator: '닉네임3', totalQuestions: 90 },
    { id: 4, title: '겜할 사람 급구 ㄱ4', description: '퀴즈에 대한 설명입니다.', creator: '닉네임4', totalQuestions: 65 },
    { id: 5, title: '겜할 사람 급구 ㄱ5', description: '퀴즈에 대한 설명입니다.', creator: '닉네임5', totalQuestions: 100 },
    { id: 6, title: '겜할 사람 급구 ㄱ6', description: '퀴즈에 대한 설명입니다.', creator: '닉네임6', totalQuestions: 85 },
    { id: 7, title: '겜할 사람 급구 ㄱ7', description: '퀴즈에 대한 설명입니다.', creator: '닉네임7', totalQuestions: 70 },
    { id: 8, title: '겜할 사람 급구 ㄱ8', description: '퀴즈에 대한 설명입니다.', creator: '닉네임8', totalQuestions: 95 },
    { id: 9, title: '겜할 사람 급구 ㄱ9', description: '퀴즈에 대한 설명입니다.', creator: '닉네임9', totalQuestions: 55 },
    { id: 10, title: '겜할 사람 급구 ㄱ10', description: '퀴즈에 대한 설명입니다.', creator: '닉네임10', totalQuestions: 120 },
    { id: 11, title: '겜할 사람 급구 ㄱ11', description: '퀴즈에 대한 설명입니다.', creator: '닉네임11', totalQuestions: 60 },
    { id: 12, title: '겜할 사람 급구 ㄱ12', description: '퀴즈에 대한 설명입니다.', creator: '닉네임12', totalQuestions: 45 },
];

const QuizList = () => {
    const [keyword, setKeyword] = useState("");
    const [selectedSearchType, setSelectedSearchType] = useState({ value: 'title', label: '제목' });
    const [quizDetailModalOpen, setQuizDetailModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [filteredQuizzes, setFilteredQuizzes] = useState(quizCardList);
    
    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [quizzesPerPage] = useState(8); // 페이지당 퀴즈 수
    
    const navigate = useNavigate();

    // 현재 페이지의 퀴즈 계산
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
    
    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

    // 검색 기능 구현
    const handleSearch = () => {
        if (!keyword.trim()) {
            setFilteredQuizzes(quizCardList);
            setCurrentPage(1);
            return;
        }

        const filtered = quizCardList.filter(quiz => {
            const searchField = selectedSearchType.value === 'title' ? quiz.title : quiz.creator;
            return searchField.toLowerCase().includes(keyword.toLowerCase());
        });

        setFilteredQuizzes(filtered);
        setCurrentPage(1);
        console.log(`${selectedSearchType.label}로 "${keyword}" 검색 완료`);
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
        setSelectedSearchType(selectedOption);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 이전 페이지
    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    // 다음 페이지
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // 페이지 번호 범위 계산
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        
        for (let i = Math.max(2, currentPage - delta); 
             i <= Math.min(totalPages - 1, currentPage + delta); 
             i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
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
            {filteredQuizzes.length > 0 && (
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted small">
                            총 <span className="text-primary fw-bold">{filteredQuizzes.length}</span>개의 퀴즈 중 
                            <span className="text-dark fw-bold"> {indexOfFirstQuiz + 1}-{Math.min(indexOfLastQuiz, filteredQuizzes.length)}</span>개 표시
                        </div>
                        <div className="text-muted small">
                            페이지 <span className="text-primary fw-bold">{currentPage}</span> / {totalPages}
                        </div>
                    </div>
                </div>
            )}

            {/* 퀴즈 카드 그리드 */}
            {currentQuizzes.length > 0 ? (
                <div className="mb-5">
                    {currentQuizzes.reduce((rows, _, index, arr) => {
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
                            setKeyword("");
                            setFilteredQuizzes(quizCardList);
                            setCurrentPage(1);
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
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
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