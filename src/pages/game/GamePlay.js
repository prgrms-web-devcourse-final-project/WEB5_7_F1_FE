"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import F1StartingLights from "../../layout/game/components/F1StartingLights"
import QuizTimer from "../../layout/game/components/QuizTimer"
import QuizQuestion from "../../layout/game/components/QuizQuestion"
import QuizCompleted from "../../layout/game/components/QuizCompleted"
import WinnerModal from "../../layout/game/components/WinnerModal"
import QuizResultsModal from "../../layout/game/components/QuizResultsModal"

const sampleQuestions = [
    {
        question: "Which driver won the 2024 Monaco Grand Prix?",
        answer: "Charles Leclerc",
    },
    {
        question: "What is the maximum number of power units a driver can use in a season?",
        answer: "4",
    },
    {
        question: 'Which circuit is known as "The Temple of Speed"?',
        answer: "Monza",
    },
]

const finalResults = [
    { rank: 1, name: "Lewis Hamilton", correctAnswers: 12, totalQuestions: 25, score: 120, color: "text-red-600" },
    { rank: 2, name: "Max Verstappen", correctAnswers: 11, totalQuestions: 25, score: 110, color: "text-blue-600" },
    { rank: 3, name: "Charles Leclerc", correctAnswers: 10, totalQuestions: 25, score: 100, color: "text-red-500" },
    { rank: 4, name: "Lando Norris", correctAnswers: 9, totalQuestions: 25, score: 90, color: "text-orange-500" },
]

function GamePlay() {
    const { id: roomId } = useParams()
    const [showStartingLights, setShowStartingLights] = useState(true)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [showWinnerModal, setShowWinnerModal] = useState(false)
    const [winner, setWinner] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [showResultsModal, setShowResultsModal] = useState(false)

    const handleLightsComplete = () => {
        setShowStartingLights(false)
        setQuizStarted(true)
    }

    const handleTimeUp = () => {
        handleNextQuestion()
    }

    const handleCorrectAnswer = (winnerName, answer) => {
        setWinner(winnerName)
        setCorrectAnswer(answer)
        setShowWinnerModal(true)
    }

    const handleCloseWinnerModal = () => {
        setShowWinnerModal(false)
        handleNextQuestion()
    }

    const handleNextQuestion = () => {
        if (currentQuestion < sampleQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
        } else {
            setQuizCompleted(true)
            setTimeout(() => {
                setShowResultsModal(true)
            }, 1000)
        }
    }

    const handleCloseResultsModal = () => {
        setShowResultsModal(false)
    }

    // 테스트를 위해 3초 후 정답 모달 표시
    useEffect(() => {
        if (quizStarted && !showWinnerModal && !quizCompleted) {
            const timer = setTimeout(() => {
                handleCorrectAnswer("Charles Leclerc", sampleQuestions[currentQuestion]?.answer || "")
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [quizStarted, currentQuestion, showWinnerModal, quizCompleted])

    return (
        <div className="p-8 flex flex-col h-full">
            {showStartingLights && <F1StartingLights onComplete={handleLightsComplete} />}

            <div
                className={`transition-opacity duration-500 ${quizStarted ? "opacity-100" : "opacity-0"} h-full flex flex-col`}
            >
                {/* Quiz Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                        <span className="text-sm text-gray-600">Question</span>
                        <span className="text-lg font-bold text-gray-900 ml-2">
              {quizCompleted ? sampleQuestions.length : currentQuestion + 1} / {sampleQuestions.length}
            </span>
                    </div>
                    <QuizTimer duration={quizCompleted ? 0 : 30} onTimeUp={handleTimeUp} />
                </div>

                {/* Question Content */}
                <div className="flex-1">
                    {quizCompleted ? (
                        <QuizCompleted totalQuestions={sampleQuestions.length} />
                    ) : (
                        quizStarted &&
                        currentQuestion < sampleQuestions.length && (
                            <QuizQuestion
                                questionNumber={currentQuestion + 1}
                                totalQuestions={sampleQuestions.length}
                                question={sampleQuestions[currentQuestion].question}
                            />
                        )
                    )}
                </div>
            </div>

            {/* Modals */}
            <WinnerModal
                isVisible={showWinnerModal}
                winner={winner}
                correctAnswer={correctAnswer}
                onClose={handleCloseWinnerModal}
            />

            <QuizResultsModal isVisible={showResultsModal} results={finalResults} onClose={handleCloseResultsModal} />
        </div>
    )
}

export default GamePlay
