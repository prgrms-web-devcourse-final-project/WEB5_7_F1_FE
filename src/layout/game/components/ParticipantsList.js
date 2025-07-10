import { Users, Car, Crown, CheckCircle, Clock } from "lucide-react"

function ParticipantsList({ participants }) {
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
        return <Crown className="w-3 h-3 text-yellow-500" />
      case "ready":
        return <CheckCircle className="w-3 h-3 text-green-500" />
      case "waiting":
        return <Clock className="w-3 h-3 text-orange-500" />
      default:
        return null
    }
  }

  return (
    <div className="p-3">
      <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Users className="w-4 h-4 mr-2 text-red-600" />
        참가자 ({participants.length})
      </h3>
      <div className="space-y-1">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className={`flex items-center space-x-2 p-1.5 rounded-md ${
              participant.status === "host" ? "bg-red-50" : "hover:bg-gray-50"
            }`}
          >
            <Car className={`w-4 h-4 ${participant.color}`} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-900 truncate">{participant.name}</div>
              <div className={`text-xs font-medium ${getStatusColor(participant.status)}`}>
                {getStatusText(participant.status)}
              </div>
            </div>
            {getStatusIcon(participant.status)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ParticipantsList
