import { useState, useEffect } from "react"

function QuizTimer({ duration, onTimeUp, size = "default" }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration])

  useEffect(() => {
    if (duration === 0) {
      setTimeLeft(0)
      return;
    }

    if (timeLeft <= 0) {
      onTimeUp()
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp, duration])

  const isSmall = size === "small";
  const wrapperClass = isSmall
      ? "w-12 h-12 shadow-md"
      : "w-20 h-20 shadow-lg";
  const svgClass = isSmall
      ? "w-10 h-10"
      : "w-16 h-16";
  const textClass = isSmall
      ? "text-sm font-semibold"
      : "text-xl font-bold";

  const strokeWidth = isSmall ? 6 : 8;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = duration > 0 ? circumference - (circumference * timeLeft) / duration : circumference;
  const isLowTime = timeLeft <= 5 && timeLeft > 0

  return (
    <div className="relative">
      <div className={`bg-white rounded-full flex items-center justify-center ${wrapperClass}`}>
        <svg className={`${svgClass} transform -rotate-90`} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#f3f4f6" strokeWidth="8" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={isLowTime ? "#ef4444" : "#10b981"}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${textClass} ${isLowTime ? "text-red-500" : "text-gray-900"}`}>{timeLeft}</span>
        </div>
      </div>
    </div>
  )
}

export default QuizTimer;
