"use client"

import { useState, useEffect } from "react"

function QuizTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (duration === 0) {
      setTimeLeft(0)
      return
    }

    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp, duration])

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = duration > 0 ? circumference - (circumference * timeLeft) / duration : circumference
  const isLowTime = timeLeft <= 5 && timeLeft > 0

  return (
    <div className="relative">
      <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#f3f4f6" strokeWidth="8" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isLowTime ? "#ef4444" : "#10b981"}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${isLowTime ? "text-red-500" : "text-gray-900"}`}>{timeLeft}</span>
        </div>
      </div>
    </div>
  )
}

export default QuizTimer
