import {Clock, List, MessageCircleQuestion} from "lucide-react"

function QuizInfoCard({ gameSetting }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{gameSetting?.quiz.title}</h2>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            className="w-full h-64 object-cover rounded-xl"
            src={gameSetting?.quiz.thumbnailUrl}
            alt="F1 race car on track with checkered flag"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-2">
              <MessageCircleQuestion className="w-4 h-4" />
              <span className="font-medium">총 {gameSetting?.quiz.numberOfQuestion} 문제</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">퀴즈 설명</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {gameSetting?.quiz.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">제한 시간</span>
              </div>
              <div className="text-lg font-bold text-blue-700">{gameSetting?.timeLimit}초</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <List className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">라운드</span>
              </div>
              <div className="text-lg font-bold text-purple-700">{gameSetting?.round}개</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizInfoCard
