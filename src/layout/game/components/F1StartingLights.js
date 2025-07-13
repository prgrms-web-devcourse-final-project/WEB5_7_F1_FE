"use client"

import { useState, useEffect } from "react"

function F1StartingLights({ onComplete }) {
  const [activeLights, setActiveLights] = useState([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const lightSequence = async () => {
      // 각 신호등을 0.8초 간격으로 점등
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setActiveLights((prev) => [...prev, i])
      }

      // 모든 신호등이 점등된 후 1초 대기
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 페이드 아웃 시작
      setIsVisible(false)

      // 페이드 아웃 완료 후 콜백 실행
      setTimeout(onComplete, 500)
    }

    const timer = setTimeout(lightSequence, 500)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500">
        <div className="text-white text-4xl font-bold mb-8">🏁 시동 거세요, 퀴즈 레이스가 곧 시작됩니다!</div>
        <div className="flex gap-10 mb-8">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`w-20 h-20 rounded-full border-4 transition-all duration-300 ${
                activeLights.includes(index)
                  ? "bg-red-500 border-red-500 shadow-[0_0_30px_#ef4444,0_0_60px_#ef4444]"
                  : "bg-gray-800 border-gray-600"
              }`}
            />
          ))}
        </div>
        <div className="text-white text-xl font-medium">출발 신호를 주목하세요!</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center">
      <div className="text-white text-4xl font-bold mb-8">🏁 시동 거세요, 퀴즈 레이스가 곧 시작됩니다!</div>
      <div className="flex gap-10 mb-8">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`w-20 h-20 rounded-full border-4 transition-all duration-300 ${
              activeLights.includes(index)
                ? "bg-red-500 border-red-500 shadow-[0_0_30px_#ef4444,0_0_60px_#ef4444]"
                : "bg-gray-800 border-gray-600"
            }`}
          />
        ))}
      </div>
      <div className="text-white text-xl font-medium">출발 신호를 주목하세요!</div>
    </div>
  )
}

export default F1StartingLights
