import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import F1StartingLights from "../../layout/game/components/F1StartingLights"
import QuizTimer from "../../layout/game/components/QuizTimer"
import QuizQuestion from "../../layout/game/components/QuizQuestion"
import QuizResultsModal from "../../layout/game/components/QuizResultsModal"
import {useRecoilValue} from "recoil";
import {
    gameResultAtom,
    questionResultAtom,
    questionsAtom,
    questionStartAtom
} from "../../state/atoms";
import WinnerModal from "../../layout/game/components/WinnerModal";

function GamePlay() {
    const { id: roomId } = useParams();
    const navigate = useNavigate();
    const [showStartingLights, setShowStartingLights] = useState(true);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const questions = useRecoilValue(questionsAtom);
    const currentQuestion = useRecoilValue(questionStartAtom);
    const questionsResult = useRecoilValue(questionResultAtom);
    const gameResult = useRecoilValue(gameResultAtom);
    const [visibleQuestion, setVisibleQuestion] = useState(false);
    const [showWinnerModal, setShowWinnerModal] = useState(false);

    // console.log('questions: ', questions, currentQuestion, questionsResult, );

    const handleLightsComplete = () => {
        setShowStartingLights(false)
        setQuizStarted(true)
    }

    const handleTimeUp = () => {
    }

    const handleCloseWinnerModal = () => {
        setShowWinnerModal(false);
    }

    const handleCloseResultsModal = () => {
        setShowResultsModal(false);
        setQuizCompleted(true);
    }

    //QUESTION_START 메시지를 받으면 정해진 timestamp에 퀴즈 렌더링
    useEffect(() => {
        if (currentQuestion) {
            const trimmed = currentQuestion.timestamp.replace(/\.\d+Z$/, 'Z');
            const targetTime = new Date(trimmed);

            const now = new Date();
            const delay = targetTime.getTime() - now.getTime(); // 밀리초 차이

            if (delay <= 0) {
                // 이미 시간이 지났으면 바로 렌더링
                setVisibleQuestion(true);
                setShowWinnerModal(false);
            } else {
                // 아직 안 됐으면, 그 시간에 맞춰 타이머 설정
                const timer = setTimeout(() => {
                    setVisibleQuestion(true);
                    setShowWinnerModal(false);
                }, delay);

                return () => clearTimeout(timer); // 언마운트 시 정리
            }
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (questionsResult) {
            setVisibleQuestion(false);
            setShowWinnerModal(true);
        }
    }, [questionsResult]);

    useEffect(() => {
        if (quizCompleted) {
            navigate(`/room/${roomId}`);
        }
    }, [quizCompleted])

    useEffect(() => {
        if (gameResult) {
            setShowWinnerModal(false);
            setShowResultsModal(true);
        }
    }, [gameResult]);

    return (
        <div className="p-8 flex flex-col h-full">
            {showStartingLights && <F1StartingLights onComplete={handleLightsComplete} />}

            <div className={`transition-opacity duration-500 ${quizStarted ? "opacity-100" : "opacity-0"} h-full flex flex-col`}>
                {/* Quiz Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                        <span className="text-lg text-gray-600">문제</span>
                        <span className="text-lg font-bold text-gray-900 ml-2">
                            {questions && currentQuestion && `${currentQuestion.round} / ${questions.length}`}
                        </span>
                    </div>
                    <QuizTimer duration={currentQuestion ? currentQuestion.timeLimit : 0} onTimeUp={handleTimeUp} />
                </div>

                {/* Question Content */}
                <div className="flex-1 flex justify-center">
                    {/*<QuizCompleted totalQuestions={questions?.length} />*/}
                    {visibleQuestion && <QuizQuestion questionContent={currentQuestion && questions && questions[currentQuestion.round - 1].question}/>}
                </div>
            </div>
            <WinnerModal isVisible={showWinnerModal} questionsResult={questionsResult} onClose={handleCloseWinnerModal}/>
            <QuizResultsModal isVisible={showResultsModal} results={gameResult ?? []} onClose={handleCloseResultsModal} />
        </div>
    )
}

export default GamePlay;
