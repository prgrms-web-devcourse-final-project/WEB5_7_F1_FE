import { useEffect, useState } from "react"
import { Trophy, User, Clock } from "lucide-react"

function WinnerModal({ isVisible, questionsResult, onClose, autoCloseDelay = 5000 }) {
  const [shouldShow, setShouldShow] = useState(false)

  // 정답자가 있는지 확인
  const hasWinner = questionsResult?.correctUser

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true)
      const timer = setTimeout(() => {
        setShouldShow(false)
        setTimeout(onClose, 500) // 페이드 아웃 후 닫기
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, autoCloseDelay, onClose])

  if (!isVisible) return null

  return (
      <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
              shouldShow ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
          }}
      >
        {/* 정답자가 있을 때만 Confetti Animation */}
        {hasWinner && (
            <>
              <div
                  className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animation: "confetti-fall 3s ease-out infinite" }}
              />
              <div
                  className="absolute top-0 left-1/2 w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animation: "confetti-fall 3s ease-out infinite", animationDelay: "0.2s" }}
              />
              <div
                  className="absolute top-0 left-3/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animation: "confetti-fall 3s ease-out infinite", animationDelay: "0.4s" }}
              />
              <div
                  className="absolute top-0 left-1/3 w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animation: "confetti-fall 3s ease-out infinite", animationDelay: "0.6s" }}
              />
              <div
                  className="absolute top-0 left-2/3 w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                  style={{ animation: "confetti-fall 3s ease-out infinite", animationDelay: "0.8s" }}
              />
            </>
        )}

        {/* Modal Content */}
        <div
            className={`bg-white rounded-3xl shadow-2xl p-12 max-w-lg mx-4 text-center transition-all duration-800 ${
                shouldShow ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-12 opacity-0"
            }`}
        >
          <div className="mb-6">
            <div
                className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg ${
                    hasWinner
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                        : "bg-gradient-to-br from-gray-400 to-gray-600"
                }`}
            >
              {hasWinner ? <Trophy className="text-white w-12 h-12" /> : <Clock className="text-white w-12 h-12" />}
            </div>
          </div>

          <div className="mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${hasWinner ? "text-gray-900" : "text-gray-700"}`}>
              {hasWinner ? "정답!" : "시간 종료"}
            </h2>

            {/* Winner Info or No Winner Message */}
            {hasWinner ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="text-lg font-semibold text-green-800 mb-1 flex items-center justify-center">
                    <User className="w-5 h-5 mr-2" />
                    {questionsResult?.correctUser}
                  </div>
                  <div className="text-sm text-green-600">가장 먼저 정답을 맞혔습니다!</div>
                </div>
            ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                  <div className="text-lg font-semibold text-orange-800 mb-1 flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2" />
                    정답자가 없습니다
                  </div>
                  <div className="text-sm text-orange-600">아쉽게도 아무도 정답을 맞히지 못했어요</div>
                </div>
            )}

            {/* Correct Answer */}
            <div
                className={`rounded-xl p-4 ${
                    hasWinner ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"
                }`}
            >
              <div className={`text-sm mb-1 ${hasWinner ? "text-blue-600" : "text-gray-600"}`}>정답</div>
              <div className={`text-xl font-bold ${hasWinner ? "text-blue-900" : "text-gray-800"}`}>
                {questionsResult?.answer}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      </div>
  )
}

export default WinnerModal
