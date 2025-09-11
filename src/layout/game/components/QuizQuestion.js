
// 상대 경로 앞에 슬래시를 보장해 Public 기준에서 로드되도록 보정
const ensureLeadingSlash = (url) => {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url; // 절대 URL은 그대로 사용
    return url.startsWith('/') ? url : `/${url}`;
}

function QuizQuestion({ questionContent, quizType }) {
    if (quizType === 'IMAGE' && questionContent) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex-1 flex items-center justify-center">
                <div className="text-center">
                    <img 
                        src={ensureLeadingSlash(questionContent)} 
                        alt="곧 퀴즈가 시작됩니다!" 
                        className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
                        style={{ maxHeight: '400px' }}
                    />
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex-1 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900">{questionContent ?? '곧 퀴즈가 시작됩니다!'}</h2>
            </div>
        </div>
    );
}

export default QuizQuestion
