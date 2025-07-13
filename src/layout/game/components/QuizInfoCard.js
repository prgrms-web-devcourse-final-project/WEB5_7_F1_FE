import { MessageCircleQuestion, Clock, List } from "lucide-react"

function QuizInfoCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">F1 2024 시즌 퀴즈</h2>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            className="w-full h-64 object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=256&fit=crop"
            alt="F1 race car on track with checkered flag"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-2">
              <MessageCircleQuestion className="w-4 h-4" />
              <span className="font-medium">총 80 문제</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">퀴즈 설명</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              드라이버, 팀, 서킷, 그리고 기억에 남는 순간들을 포함한 2024 F1 시즌에 대한 문제들로 도전해보세요.
              모나코부터 실버스톤까지, 세계 최고의 레이싱 챔피언십에 대한 지식을 테스트해보세요.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">제한 시간</span>
              </div>
              <div className="text-lg font-bold text-blue-700">60초</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <List className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">문제 수</span>
              </div>
              <div className="text-lg font-bold text-purple-700">30개</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizInfoCard
