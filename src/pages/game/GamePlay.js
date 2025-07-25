import {useState} from "react"
import {useParams} from "react-router-dom"
import F1StartingLights from "../../layout/game/components/F1StartingLights"
import QuizTimer from "../../layout/game/components/QuizTimer"
import QuizQuestion from "../../layout/game/components/QuizQuestion"
import QuizCompleted from "../../layout/game/components/QuizCompleted"
import QuizResultsModal from "../../layout/game/components/QuizResultsModal"
import {useRecoilValue} from "recoil";
import {
    questionResultAtom,
    questionsAtom,
    questionStartAtom
} from "../../state/atoms";

const finalResults = [
    { rank: 1, name: "Lewis Hamilton", correctAnswers: 12, totalQuestions: 25, score: 120, color: "text-red-600" },
    { rank: 2, name: "Max Verstappen", correctAnswers: 11, totalQuestions: 25, score: 110, color: "text-blue-600" },
    { rank: 3, name: "Charles Leclerc", correctAnswers: 10, totalQuestions: 25, score: 100, color: "text-red-500" },
    { rank: 4, name: "Lando Norris", correctAnswers: 9, totalQuestions: 25, score: 90, color: "text-orange-500" },
]

function GamePlay() {
    const { id: roomId } = useParams();
    const [showStartingLights, setShowStartingLights] = useState(true);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const questions = useRecoilValue(questionsAtom);
    const currentQuestion = useRecoilValue(questionStartAtom);
    const questionsResult = useRecoilValue(questionResultAtom);
    console.log('questions: ', questions, currentQuestion, questionsResult);

    const handleLightsComplete = () => {
        setShowStartingLights(false)
        setQuizStarted(true)
    }

    const handleTimeUp = () => {
    }

    const handleCloseResultsModal = () => {
        setShowResultsModal(false);
    }

    return (
        <div className="p-8 flex flex-col h-full">
            {showStartingLights && <F1StartingLights onComplete={handleLightsComplete} />}

            <div className={`transition-opacity duration-500 ${quizStarted ? "opacity-100" : "opacity-0"} h-full flex flex-col`}>
                {/* Quiz Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                        <span className="text-lg text-gray-600">문제</span>
                        <span className="text-lg font-bold text-gray-900 ml-2">
              {quizCompleted ? questions?.length : currentQuestion?.round} / {questions?.length}
            </span>
                    </div>
                    <QuizTimer duration={quizCompleted ? 0 : 30} onTimeUp={handleTimeUp} />
                </div>

                {/* Question Content */}
                <div className="flex-1 flex justify-center">
                    {quizCompleted ? (
                        <QuizCompleted totalQuestions={questions?.length} />
                    ) : (
                        quizStarted &&
                        currentQuestion?.round <= questions?.length && (
                            <QuizQuestion question={questions[currentQuestion?.round]?.question}/>
                        )
                    )}
                </div>
            </div>
            <QuizResultsModal isVisible={showResultsModal} results={finalResults} onClose={handleCloseResultsModal} />
        </div>
    )
}

export default GamePlay
