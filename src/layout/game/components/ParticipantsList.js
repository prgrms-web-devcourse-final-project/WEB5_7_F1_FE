import { Users, Car, Crown, CheckCircle, Clock } from "lucide-react"
import {useRecoilValue} from "recoil";
import {playerListAtom} from "../../../state/atoms";

function ParticipantsList() {
  const players = useRecoilValue(playerListAtom);
  const getStatusText = (status) => {
    switch (status) {
      case "host":
        return "방장"
      case "ready":
        return "준비 완료"
      case "waiting":
        return "대기 중"
      default:
        return ""
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "host":
        return "text-red-600"
      case "ready":
        return "text-green-600"
      case "waiting":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "host":
        return <Crown className="w-4 h-4 text-yellow-500" />
      case "ready":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "waiting":
        return <Clock className="w-4 h-4 text-orange-500" />
      default:
        return null
    }
  }

  return (
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-red-600" />
          참가자 ({players.length})
        </h3>
        <div className="space-y-0">
          {players.map((player) => (
              <div
                  key={player.color}
                  className={`flex items-center space-x-3 p-1 rounded-md ${
                      player.status === "host" ? "bg-red-50" : "hover:bg-gray-50"
                  }`}
              >
                <Car className={`w-5 h-5 ${player.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{player.nickname}</div>
                </div>
                <div className={`text-sm font-medium ${getStatusColor(player.status)}`}>
                  {getStatusText(player.status)}
                </div>
                {getStatusIcon(player.status)}
              </div>
          ))}
        </div>
      </div>
  )
}

export default ParticipantsList
