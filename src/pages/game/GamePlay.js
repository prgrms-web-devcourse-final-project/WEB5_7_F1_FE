import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import F1StartingLights from '../../layout/game/components/F1StartingLights';
import QuizTimer from '../../layout/game/components/QuizTimer';
import QuizQuestion from '../../layout/game/components/QuizQuestion';
import QuizResultsModal from '../../layout/game/components/QuizResultsModal';
import { useRecoilState, useSetRecoilState } from 'recoil'; // useSetRecoilState 추가
import {
  gameResultAtom,
  questionResultAtom,
  questionsAtom,
  questionStartAtom,
  quizStartedAtom, // 새로 추가한 아톰
} from '../../state/atoms';
import WinnerModal from '../../layout/game/components/WinnerModal';

function GamePlay() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const [showStartingLights, setShowStartingLights] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [questions, setQuestions] = useRecoilState(questionsAtom);
  const [currentQuestion, setCurrentQuestion] =
    useRecoilState(questionStartAtom);
  const [questionsResult, setQuestionsResult] =
    useRecoilState(questionResultAtom);
  const [gameResult, setGameResult] = useRecoilState(gameResultAtom);
  const [visibleQuestion, setVisibleQuestion] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  // useSetRecoilState를 사용하여 quizStartedAtom을 업데이트하는 함수를 가져옵니다.
  const setQuizStartedState = useSetRecoilState(quizStartedAtom);

  const handleLightsComplete = () => {
    setShowStartingLights(false);
    setQuizStarted(true);
    setQuizStartedState(true); // 게임 시작 상태를 true로 설정합니다.
  };

  const handleTimeUp = () => {};

  const handleCloseWinnerModal = () => {
    setShowWinnerModal(false);
  };

  const handleCloseResultsModal = () => {
    setShowResultsModal(false);
    setQuizCompleted(true);
  };

  // QUESTION_START 메시지를 받으면 정해진 timestamp에 퀴즈 렌더링
  useEffect(() => {
    if (currentQuestion) {
      const trimmed = currentQuestion.timestamp.replace(/\.\d+Z$/, 'Z');
      const targetTime = new Date(trimmed);
      const now = new Date();
      const delay = targetTime.getTime() - now.getTime();

      if (delay <= 0) {
        setVisibleQuestion(true);
        setShowWinnerModal(false);
      } else {
        const timer = setTimeout(() => {
          setVisibleQuestion(true);
          setShowWinnerModal(false);
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (questionsResult) {
      setVisibleQuestion(false);
      setShowWinnerModal(true);
    }
  }, [questionsResult]);

  useEffect(() => {
    if (quizCompleted) {
      setCurrentQuestion(null);
      setGameResult(null);
      setQuestions(null);
      setQuestionsResult(null);
      setQuizStartedState(false); // 게임 완료 후에는 상태를 false로 변경합니다.
      navigate(`/room/${roomId}`);
    }
  }, [
    quizCompleted,
    navigate,
    roomId,
    setCurrentQuestion,
    setGameResult,
    setQuestions,
    setQuestionsResult,
    setQuizStartedState,
  ]);

  useEffect(() => {
    if (gameResult) {
      const timeout = setTimeout(() => {
        setShowWinnerModal(false);
        setShowResultsModal(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [gameResult]);

  // 이 컴포넌트 내부에 있던 뒤로가기 로직은 삭제되었습니다.
  // 이제 뒤로가기 이벤트는 GameLayout에서 전역 상태(quizStartedAtom)를 기반으로 처리합니다.

  return (
    <div className='p-8 flex flex-col h-full'>
      {showStartingLights && (
        <F1StartingLights onComplete={handleLightsComplete} />
      )}
      <div
        className={`transition-opacity duration-500 ${
          quizStarted ? 'opacity-100' : 'opacity-0'
        } h-full flex flex-col`}
      >
        {/* Quiz Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='bg-white rounded-lg px-4 py-2 shadow-sm'>
            <span className='text-lg text-gray-600'>문제</span>
            <span className='text-lg font-bold text-gray-900 ml-2'>
              {questions &&
                currentQuestion &&
                `${currentQuestion.round} / ${questions.length}`}
            </span>
          </div>
          {visibleQuestion && (
            <QuizTimer
              duration={currentQuestion.timeLimit}
              onTimeUp={handleTimeUp}
            />
          )}
        </div>
        {/* Question Content */}
        <div className='flex-1 flex justify-center'>
          {visibleQuestion && (
            <QuizQuestion
              questionContent={
                currentQuestion &&
                questions &&
                questions[currentQuestion.round - 1].question
              }
            />
          )}
        </div>
      </div>
      <WinnerModal
        isVisible={showWinnerModal}
        questionsResult={questionsResult}
        onClose={handleCloseWinnerModal}
      />
      <QuizResultsModal
        isVisible={showResultsModal}
        results={gameResult ?? []}
        onClose={handleCloseResultsModal}
      />
    </div>
  );
}

export default GamePlay;
