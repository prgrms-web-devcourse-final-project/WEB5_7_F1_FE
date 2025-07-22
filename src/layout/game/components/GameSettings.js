import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {Settings} from "lucide-react"
import QuizSelectModal from "../../../pages/game/QuizSelectModal";
import {useRecoilValue} from "recoil";
import {stompSendMessageAtom} from "../../../state/atoms";

function GameSettings({ roomId, gameSetting, allReady }) {
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [questionCount, setQuestionCount] = useState(gameSetting?.quiz.numberOfQuestion);
  const [quizSelectModalOpen, setQuizSelectModalOpen] = useState(false);
  const navigate = useNavigate();
  const sendMessage = useRecoilValue(stompSendMessageAtom);

  const handleStartGame = () => {
    sendMessage(`/pub/room/start/${roomId}`, "");
    navigate(`/room/${roomId}/play`);
  }

  const handleQuizSelect = (quiz) => {
    const quizChangeMessage = {
      "message" : {
        "quizId" : quiz.quizId,
      }
    }
    sendMessage(`/room/quiz/${roomId}`, quizChangeMessage);
  }

  const handleTimePerQuestionChange = (e) => {
    console.log('handleTimePerQuestionChange: ', e.target.value)
    setTimePerQuestion(e.target.value);
    const timePerQuestionMessage = {
      "message" : {
        "timeLimit" : e.target.value
      }
    }
    sendMessage(`/room/time-limit/${roomId}`, timePerQuestionMessage);
  };

  const handleQuestionCountChange = (e) => {
    console.log('handleQuestionCountChange: ', e.target.value)
    setQuestionCount(e.target.value);
    const questionCountMessage = {
      "message" : {
        "round" : e.target.value
      }
    }
    sendMessage(`/room/round/${roomId}`, questionCountMessage);
  };

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
                {"퀴즈 선택"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제한 시간</label>
                <select
                    value={timePerQuestion}
                    onChange={handleTimePerQuestionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white bg-no-repeat bg-right pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                >
                  <option value={15}>15초</option>
                  <option value={30}>30초</option>
                  <option value={45}>45초</option>
                  <option value={60}>60초</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">라운드</label>
                <select
                    value={questionCount}
                    onChange={handleQuestionCountChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white bg-no-repeat bg-right pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                >
                  {Array.from({ length: gameSetting?.quiz.numberOfQuestion - 9 }, (_, i) => {
                    const value = i + 10;
                    return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="pt-4">
              <button onClick={handleStartGame}
                      disabled={!allReady}
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
