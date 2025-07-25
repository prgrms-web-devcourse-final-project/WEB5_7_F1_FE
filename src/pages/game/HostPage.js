import {useParams} from "react-router-dom"
import QuizInfoCard from "../../layout/game/components/QuizInfoCard"
import GameSettings from "../../layout/game/components/GameSettings"
import {useRecoilValue} from "recoil";
import {
  gameSettingAtom,
  loginUserAtom,
  playerListAtom,
  stompSendMessageAtom
} from "../../state/atoms";
import HostPageHeader from "./HostPageHeader";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {isEmptyOrNull} from "../../utils/utils";

function HostPage() {
  const { id: roomId } = useParams();
  const [isReady, setReady] = useState(false);
  const sendMessage = useRecoilValue(stompSendMessageAtom);
  const gameSetting = useRecoilValue(gameSettingAtom);

  //현재 로그인 유저를 찾고 방장인지 확인
  const playerList = useRecoilValue(playerListAtom);
  const loginUser = useRecoilValue(loginUserAtom);
  const matchingPlayers = playerList.filter(player => player.nickname === loginUser.name);
  const isHost = matchingPlayers.some(player => player.status === "host");
  const allReady = playerList.length > 1 && playerList.every(player => player.ready);

  useEffect(() => {
    if (playerList && !isEmptyOrNull(matchingPlayers)) {
      setReady(matchingPlayers[0].ready);
    }
  }, [playerList])

  const handleExitRoomClick = () => {
    sendMessage(`/pub/room/exit/${roomId}`, "");
  };

  const handleReadyGame = () => {
    // setReady(prev => !prev);
    sendMessage(`/pub/room/ready/${roomId}`, "");
  }

  return (
    <div className="flex flex-col h-full" style={{ height: "90vh" }}>
      <HostPageHeader isHost={isHost} handleExitRoomClick={handleExitRoomClick}/>
      {/* Body */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <QuizInfoCard gameSetting={gameSetting} />
          {isHost ? <GameSettings roomId={roomId} gameSetting={gameSetting} allReady={allReady}/> :
            <button onClick={handleReadyGame}
                    className={clsx(
                        "w-full px-6 py-3 text-white rounded-lg transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed",
                        {
                          "bg-green-600 hover:bg-green-700": !isReady,
                          "bg-red-600 hover:bg-red-700": isReady
                        }
                    )}>
              {isReady ? '준비 완료 상태입니다.다시 클릭하면 준비 해제됩니다.' : '준비'}
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default HostPage
