"use client"
import { useState, useEffect } from "react"
import { X, Search, ChevronLeft, ChevronRight, Clock, FileText, Loader2 } from "lucide-react"
import {useApiQuery} from "../../hooks/useApiQuery";
import axios from "axios";

function QuizSelectModal({ isOpen, onClose, onSelect }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedQuizId, setSelectedQuizId] = useState(null)
    const [searchType, setSearchType] = useState("title")

    // API 관련 상태
    const [quizList, setQuizList] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [totalElements, setTotalElements] = useState(0)

    const { data, isLoading } = useApiQuery(
        ["quizzes", currentPage, searchTerm, searchType],
        () => quizRequest(currentPage, searchTerm, searchType),
    );

    useEffect(() => {
        if (data) {
            setQuizList(data.quiz);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements)
        }
    }, [data])

    // 목업 데이터 (실제 API 응답 형태)
    const quizRequest = async (page = 1, search = "", type = "all") => {
        // 여기에 실제 API 호출 코드를 넣으세요
        const params = new URLSearchParams({
          page: page.toString(),
          size: "8",
        })

        if (search.trim()) {
          switch (type) {
            case "title":
              params.append("title", search.trim())
              break
            case "creator":
              params.append("creator", search.trim())
              break
          }
        }

        const response = await axios.get(`/quizzes`, { params })
        return response.data;
    }

    // 모달이 열릴 때 초기 데이터 로드
    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1)
            setSearchTerm("")
            setSelectedQuizId(null)
        }
    }, [isOpen])

    const handleQuizSelect = (quiz) => {
        setSelectedQuizId(quiz.quizId)
    }

    const handleConfirmSelect = () => {
        const selectedQuiz = quizList.find((quiz) => quiz.quizId === selectedQuizId)
        if (selectedQuiz) {
            onSelect(selectedQuiz)
            onClose()
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = () => {

    }

    const clearSearch = () => {
        setSearchTerm("")
    }

    // Enter 키로 검색
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col border-2 border-red-500">
                {/* 헤더 - 레드 배경 */}
                <div className="bg-red-600 text-white flex items-center justify-between p-6 rounded-t-2xl">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold">퀴즈 선택</h2>
                        {totalElements > 0 && (
                            <span className="bg-red-700 px-3 py-1 rounded-full text-sm font-medium">총 {totalElements}개</span>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-red-700 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* 검색 영역 - 다크 배경 */}
                <div className="bg-gray-900 text-white p-6 border-b border-red-500">
                    <div className="flex items-center space-x-3">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="px-3 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-800 text-white"
                        >
                            <option value="all">전체</option>
                            <option value="title">제목</option>
                            <option value="creator">제작자</option>
                        </select>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder={
                                    searchType === "title"
                                        ? "퀴즈 제목을 검색하세요."
                                        : "제작자를 검색하세요."
                                }
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full pl-4 pr-12 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-800 text-white placeholder-gray-400"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                            </button>
                        </div>
                        {searchTerm && (
                            <button onClick={clearSearch} className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors">
                                취소
                            </button>
                        )}
                    </div>
                </div>

                {/* 퀴즈 그리드 */}
                <div className="flex-1 overflow-y-auto min-h-0 bg-gray-50">
                    <div className="p-6">
                        {isLoading ? (
                            // 로딩 상태
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
                                    <p className="text-gray-600">퀴즈를 불러오는 중...</p>
                                </div>
                            </div>
                        ) : quizList.length === 0 ? (
                            // 빈 상태
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <p className="text-gray-600 mb-2">
                                        {searchTerm ? "검색 결과가 없습니다." : "등록된 퀴즈가 없습니다."}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {searchTerm ? "다른 검색어를 시도해보세요." : "새로운 퀴즈가 등록되면 여기에 표시됩니다."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {quizList.map((quiz) => (
                                        <div
                                            key={quiz.quizId}
                                            onClick={() => handleQuizSelect(quiz)}
                                            className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
                                                selectedQuizId === quiz.quizId
                                                    ? "border-red-500 bg-red-50 shadow-lg shadow-red-200"
                                                    : "border-gray-300 bg-white hover:border-red-300"
                                            }`}
                                        >
                                            <div className="aspect-video bg-gray-200 relative">
                                                <img
                                                    src={quiz.thumbnailUrl || "/placeholder.svg?height=120&width=200&text=No+Image"}
                                                    alt={quiz.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "/placeholder.svg?height=120&width=200&text=No+Image"
                                                    }}
                                                />
                                                {selectedQuizId === quiz.quizId && (
                                                    <div className="absolute top-2 left-2">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              선택됨
                            </span>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
                                                    <FileText className="w-3 h-3 mr-1" />
                                                    {quiz.numberOfQuestion}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-900 text-sm mb-2 truncate">{quiz.title}</h3>
                                                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{quiz.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500 truncate">제작자 • {quiz.creatorNickname}</span>
                                                    <div className="flex items-center text-xs text-red-600 font-medium">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {quiz.numberOfQuestion}문제
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* 페이징 */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center space-x-2">
                                        <button
                                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1 || isLoading}
                                            className="p-2 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed text-red-600"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                disabled={isLoading}
                                                className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 ${
                                                    currentPage === page
                                                        ? "bg-red-600 text-white shadow-lg"
                                                        : "hover:bg-red-100 text-red-600 hover:text-red-700"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages || isLoading}
                                            className="p-2 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed text-red-600"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* 하단 버튼 - 레드 배경 */}
                {selectedQuizId && (
                    <div className="bg-gray-900 p-6 rounded-b-2xl flex-shrink-0 border-t border-red-500">
                        <button
                            onClick={handleConfirmSelect}
                            className="w-full px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            선택 완료
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuizSelectModal
