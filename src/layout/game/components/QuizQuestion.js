function QuizQuestion({ question }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">{question}</h2>
      </div>
    </div>
  )
}

export default QuizQuestion
