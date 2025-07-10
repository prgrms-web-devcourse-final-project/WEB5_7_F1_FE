import styles from './quiz.module.scss';
import {Image, Stack} from "react-bootstrap";
import sample from '../../assets/images/sample.png';

const QuizCard = ({ quiz, onClick }) => {
    return (
        <div 
            className={`${styles.quizCard} position-relative`} 
            onClick={onClick}
            style={{ 
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                background: 'white',
                border: '1px solid #e9ecef'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
        >
            {/* 호버 효과를 위한 상단 바 */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff1e1e, #e10600)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.3s ease'
                }}
                className="hover-bar"
            />
            
            {/* 퀴즈 이미지 */}
            <div className="p-3">
                <div 
                    style={{
                        width: '100%',
                        height: '160px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        overflow: 'hidden'
                    }}
                >
                    <Image 
                        src={sample} 
                        alt="퀴즈 이미지"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                
                {/* 퀴즈 제목 */}
                <h4 
                    className="mt-3 mb-2" 
                    style={{
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: '#333',
                        lineHeight: '1.2',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                    title={quiz?.title || '퀴즈의 제목'}
                >
                    {quiz?.title || '퀴즈의 제목'}
                </h4>
                
                {/* 퀴즈 설명 */}
                <p 
                    style={{
                        color: '#666',
                        marginBottom: '1rem',
                        lineHeight: '1.5',
                        fontSize: '0.9rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {quiz?.description || '퀴즈에 대한 설명입니다.'}
                </p>
                
                {/* 퀴즈 메타 정보 */}
                <Stack 
                    direction="horizontal" 
                    className="justify-content-between"
                    style={{
                        fontSize: '0.9rem',
                        color: '#888'
                    }}
                >
                    <span>
                        <strong>제작자:</strong> {quiz?.creator || '닉네임'}
                    </span>
                    <span>
                        <strong>총 {quiz?.totalQuestions || 80}문제</strong>
                    </span>
                </Stack>
            </div>
            
            <style jsx>{`
                .${styles.quizCard}:hover .hover-bar {
                    transform: translateX(0) !important;
                }
            `}</style>
        </div>
    );
};

export default QuizCard;