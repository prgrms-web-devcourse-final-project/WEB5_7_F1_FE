import {useNavigate, useParams} from "react-router-dom"
import QuizInfoCard from "../../layout/game/components/QuizInfoCard"
import GameSettings from "../../layout/game/components/GameSettings"
import {useRecoilValue} from "recoil";
import {stompSendMessageAtom} from "../../state/atoms";
import HostPageHeader from "./HostPageHeader";

function HostPage() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const sendMessage = useRecoilValue(stompSendMessageAtom);

  const handleExitRoomClick = () => {
    sendMessage(`/pub/room/exit/${roomId}`, "");
    navigate("/room");
  };

  return (
    <div className="flex flex-col h-full" style={{ height: "90vh" }}>
      <HostPageHeader handleExitRoomClick={handleExitRoomClick}/>
      {/* Body */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <QuizInfoCard />
          <GameSettings isHost={true} roomId={roomId} />
        </div>
      </div>
    </div>
  )
}

export default HostPage
