import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Settings } from "lucide-react"
import QuizSelectModal from "../../../pages/game/QuizSelectModal";
import {useRecoilValue} from "recoil";
import {stompSendMessageAtom} from "../../../state/atoms";

function GameSettings({ roomId }) {
  const [timePerQuestion, setTimePerQuestion] = useState("30초");
  const [questionCount, setQuestionCount] = useState(25);
  const [quizSelectModalOpen, setQuizSelectModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();
  const sendMessage = useRecoilValue(stompSendMessageAtom);

  const handleStartGame = () => {
    sendMessage(`/pub/room/start/${roomId}`, "");
    navigate(`/room/${roomId}/play`);
  }

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  }

  return (
      <>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-red-600" />
            게임 설정
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">퀴즈</label>
              <button
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  onClick={() => setQuizSelectModalOpen(true)}
              >
                {selectedQuiz ? selectedQuiz.title : "퀴즈 선택"}
              </button>
              {selectedQuiz && <p className="text-sm text-gray-600 mt-2">{selectedQuiz.description}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제한 시간</label>
                <select
                    value={timePerQuestion}
                    onChange={(e) => setTimePerQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white bg-no-repeat bg-right pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                >
                  <option>15초</option>
                  <option>30초</option>
                  <option>45초</option>
                  <option>60초</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">문제 수</label>
                <input
                    type="number"
                    min="10"
                    max="80"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 30)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="문제 수를 입력하세요 (10-80)"
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                  onClick={handleStartGame}
                  disabled={!selectedQuiz}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                게임 시작
              </button>
            </div>
          </div>
        </div>

        <QuizSelectModal
            isOpen={quizSelectModalOpen}
            onClose={() => setQuizSelectModalOpen(false)}
            onSelect={handleQuizSelect}
        />
      </>
  )
}

export default GameSettings
