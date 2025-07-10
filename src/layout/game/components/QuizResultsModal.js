"use client"

import { useState, useEffect } from "react"
import { Medal, Crown, X } from "lucide-react"

function QuizResultsModal({ isVisible, results, onClose }) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowModal(true)
    }
  }, [isVisible])

  const handleClose = () => {
    setShowModal(false)
    setTimeout(onClose, 300) // 애니메이션 완료 후 닫기
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-4 h-4 text-yellow-500" />
      case 2:
        return <Medal className="w-4 h-4 text-gray-500" />
      case 3:
        return <Medal className="w-4 h-4 text-orange-500" />
      default:
        return null
    }
  }

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-l-4 border-yellow-400"
      case 2:
        return "bg-gray-50 border-l-4 border-gray-400"
      case 3:
        return "bg-orange-50 border-l-4 border-orange-400"
      default:
        return "hover:bg-gray-50"
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500"
      case 2:
        return "bg-gray-500"
      case 3:
        return "bg-orange-500"
      default:
        return "bg-gray-400"
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        showModal ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          showModal ? "scale-100 translate-y-0" : "scale-95 -translate-y-12"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🏁 퀴즈 최종 결과</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">등수</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">닉네임</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">맞힌 문제</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">총 점수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.rank} className={getRankBg(result.rank)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 ${getRankColor(result.rank)} text-white rounded-full flex items-center justify-center text-sm font-bold mr-3`}
                        >
                          {result.rank}
                        </div>
                        {getRankIcon(result.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{result.name}</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">
                      {result.correctAnswers} / {result.totalQuestions}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">{result.score}점</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizResultsModal
