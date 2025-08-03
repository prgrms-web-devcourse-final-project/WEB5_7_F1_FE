import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  chatAtom,
  gameResultAtom,
  gameSettingAtom,
  loginUserAtom,
  playerListAtom,
  questionResultAtom,
  questionsAtom,
  questionStartAtom,
  rankUpdateAtom,
  roomSettingAtom,
  stompSendMessageAtom,
  systemNoticeAtom,
  quizStartedAtom,
} from '../../state/atoms';
import useStompClient from '../../hooks/useStompClient';
import { useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import { useApiQuery } from '../../hooks/useApiQuery';
import axios from 'axios';

const PLAYER_COLORS = [
  'text-red-600',
  'text-blue-600',
  'text-red-500',
  'text-orange-500',
  'text-cyan-500',
  'text-green-600',
  'text-purple-600',
  'text-pink-600',
];

const authMeRequest = async () => {
  const response = await axios.get(`/auth/me`);
  return response.data;
};

const GameLayout = () => {
  const { id: roomId } = useParams();
  const setPlayerList = useSetRecoilState(playerListAtom);
  const setRoomSetting = useSetRecoilState(roomSettingAtom);
  const setGameSetting = useSetRecoilState(gameSettingAtom);
  const setChat = useSetRecoilState(chatAtom);
  const setQuestions = useSetRecoilState(questionsAtom);
  const setQuestionStart = useSetRecoilState(questionStartAtom);
  const setQuestionResult = useSetRecoilState(questionResultAtom);
  const setRankUpdate = useSetRecoilState(rankUpdateAtom);
  const setGameResult = useSetRecoilState(gameResultAtom);
  const setSystemNotice = useSetRecoilState(systemNoticeAtom);
  const setSendMessage = useSetRecoilState(stompSendMessageAtom);
  const setLoginUser = useSetRecoilState(loginUserAtom);
  const navigate = useNavigate();

  const isQuizStarted = useRecoilValue(quizStartedAtom);

  const { isLoading, data } = useApiQuery(['authme'], () => authMeRequest());

  const missedHeartbeatCount = useRef(0);
  const heartbeatCheckTimer = useRef(null);

  useEffect(() => {
    if (data) {
      setLoginUser(data);
    }
  }, [data, setLoginUser]);

  const disconnectRef = useRef(null);
  const ignorePopState = useRef(false);




  const handleStompMessage = useCallback(
    (payload) => {
      console.log('receive message: ', payload);
      switch (payload.type) {
        case 'PLAYER_LIST':
          const { host, players } = payload.message;
          const processedPlayers = players.map((player, index) => {
            let status = 'waiting';
            if (player.nickname === host) {
              status = 'host';
            } else if (player.ready) {
              status = 'ready';
            }
            return {
              ...player,
              status,
              color: PLAYER_COLORS[index] || 'text-gray-500',
            };
          });
          setPlayerList(processedPlayers);
          break;
        case 'ROOM_SETTING':
          setRoomSetting(payload.message);
          break;
        case 'GAME_SETTING':
          setGameSetting(payload.message);
          break;
        case 'SYSTEM_NOTICE':
          setSystemNotice(payload.message);
          break;
        case 'CHAT':
          setChat(payload.message);
          break;
        case 'GAME_START':
          setQuestions(payload.message.questions);
          navigate('play');
          break;
        case 'QUESTION_START':
          setQuestionStart(payload.message);
          break;
        case 'QUESTION_RESULT':
          setQuestionResult(payload.message);
          break;
        case 'RANK_UPDATE':
          setRankUpdate(payload.message.rank);
          break;
        case 'GAME_RESULT':
          setGameResult(payload.message.result);
          break;
        case 'EXIT_SUCCESS':
          // 서버로부터 퇴장 성공 메시지를 받은 후 소켓 연결을 끊고 페이지 이동
          if (disconnectRef.current) {
            disconnectRef.current();
          }
          localStorage.removeItem(`enteredRoom_${roomId}`);
          navigate('/room');
          break;
        case 'HEARTBEAT':
          if (sendMessageRef.current) {
            sendMessageRef.current(`/pub/heartbeat/pong`, '');
          }
          missedHeartbeatCount.current = 0;
          break;
        default:
          console.warn('알 수 없는 메시지', payload);
      }
    },
    [
      setPlayerList,
      setRoomSetting,
      setGameSetting,
      setSystemNotice,
      setChat,
      setQuestions,
      setQuestionStart,
      setQuestionResult,
      setRankUpdate,
      setGameResult,
      navigate,
    ],
  );


  const { sendMessage, disconnect } = useStompClient(
      roomId,
      handleStompMessage,
  );

  const sendMessageRef = useRef(null);

  useEffect(() => {
    heartbeatCheckTimer.current = setInterval(() => {
      missedHeartbeatCount.current += 1;

      if (missedHeartbeatCount.current >= 3) {
        if (disconnectRef.current) {
          disconnectRef.current(); // stompClient.deactivate()
          localStorage.removeItem(`enteredRoom_${roomId}`);
          navigate('/room');
        }

        clearInterval(heartbeatCheckTimer.current); // 더 이상 체크 안 해도 됨
      }
    }, 15000); // 서버 heartbeat 간격과 일치 (15초)

    return () => {
      clearInterval(heartbeatCheckTimer.current);
    };
  }, []);


  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  useEffect(() => {
    disconnectRef.current = disconnect;
  }, [disconnect]);

  useEffect(() => {
    if (sendMessage) {
      setSendMessage(() => sendMessage);
    }
  }, [sendMessage, setSendMessage]);

  // **뒤로가기 이벤트를 감지하고 라우팅을 방지하는 로직**
  useLayoutEffect(() => {
    const handlePopState = (event) => {
      // ignorePopState 플래그가 true이면 이벤트를 무시하고 플래그를 false로 되돌립니다.
      if (ignorePopState.current) {
        ignorePopState.current = false;
        return;
      }

      if (isQuizStarted) {
        const userConfirmed = window.confirm(
          '지금 나가시면 게임 결과가 반영되지 않습니다. 정말 나가시겠습니까?',
        );
        if (userConfirmed) {
          // '확인'을 누르면 서버에 퇴장 메시지를 보냅니다.
          if (disconnectRef.current) {
            disconnectRef.current();
            navigate('/room');
            localStorage.removeItem(`enteredRoom_${roomId}`);
          }
        } else {
          // '취소'를 누르면 뒤로가기 동작을 무효화하고 현재 페이지에 머무릅니다.
          // history.go(1)을 통해 뒤로가기 기록을 앞으로 이동시키고,
          // ignorePopState 플래그를 설정하여 불필요한 이벤트 중복을 막습니다.
          ignorePopState.current = true;
          window.history.go(1);
        }
      } else {
        // 게임 시작 전에는 경고 없이 바로 퇴장 메시지를 보냅니다.
        if (sendMessage) {
          sendMessage(`/pub/room/exit/${roomId}`, '');
        }
      }
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [sendMessage, roomId, isQuizStarted, disconnectRef]);

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default GameLayout;
