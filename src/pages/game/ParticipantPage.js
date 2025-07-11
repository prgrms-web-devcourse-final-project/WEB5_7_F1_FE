"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Flag, Lock, Users, LogOut } from "lucide-react"
import QuizInfoCard from "../../layout/game/components/QuizInfoCard"
import GameSettings from "../../layout/game/components/GameSettings"

function ParticipantPage() {
  const { id: roomId } = useParams()
  const [isReady, setIsReady] = useState(false)

  const handleReadyToggle = () => {
    setIsReady(!isReady)
  }

  return (
      <div className="flex flex-col h-full" style={{ height: "90vh" }}>
        {/* Header */}
        <header className="bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Flag className="w-6 h-6" />
                <h1 className="text-xl font-bold">F1 퀴즈 챔피언십</h1>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <Lock className="w-4 h-4" />
                <span className="text-sm">비공개 방</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">8/8 플레이어</span>
              </div>
              <div className="bg-blue-500/60 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">👤 참여자</span>
              </div>
              <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                <LogOut className="w-4 h-4 mr-2 inline" />방 나가기
              </button>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 p-8 flex items-center">
          <div className="max-w-6xl mx-auto">
            <QuizInfoCard />
            {/* 참여자 상태 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">내 상태</h3>
              <div
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      isReady ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isReady ? "bg-green-500" : "bg-orange-500"}`}></div>
                  <span className={`font-medium ${isReady ? "text-green-900" : "text-orange-900"}`}>
                  {isReady ? "준비 완료" : "대기 중"}
                </span>
                </div>
                <span className={`text-sm ${isReady ? "text-green-700" : "text-orange-700"}`}>
                {isReady ? "방장이 게임을 시작하기를 기다리는 중..." : "준비 완료 버튼을 눌러주세요"}
              </span>
              </div>
              <button
                  onClick={handleReadyToggle}
                  className={`w-full px-6 py-3 rounded-lg transition-colors font-semibold ${
                      isReady ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {isReady ? "준비 취소" : "준비 완료"}
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ParticipantPage
