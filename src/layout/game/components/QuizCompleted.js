function QuizCompleted() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">퀴즈가 완료되었습니다!</h2>
        <p className="text-xl text-gray-600 mt-4">결과를 확인해보세요</p>
      </div>
    </div>
  )
}

export default QuizCompleted
