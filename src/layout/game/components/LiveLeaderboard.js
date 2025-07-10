import { Trophy, Crown, Medal } from "lucide-react"

function LiveLeaderboard({ entries }) {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-3 h-3 text-yellow-500" />
      case 2:
      case 3:
        return <Medal className={`w-3 h-3 ${rank === 2 ? "text-gray-500" : "text-orange-500"}`} />
      default:
        return null
    }
  }

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border border-yellow-200"
      case 2:
        return "bg-gray-50"
      case 3:
        return "bg-orange-50"
      default:
        return "hover:bg-gray-50"
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500"
      case 2:
        return "bg-gray-500"
      case 3:
        return "bg-orange-500"
      default:
        return "bg-gray-400"
    }
  }

  const getScoreColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-600"
      case 2:
      case 3:
        return rank === 2 ? "text-gray-600" : "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-3">
      <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
        Live Ranking ({entries.length})
      </h3>
      <div className="space-y-1">
        {entries.map((entry) => (
          <div key={entry.rank} className={`flex items-center space-x-2 p-1.5 rounded-md ${getRankBg(entry.rank)}`}>
            <div
              className={`w-6 h-6 ${getRankColor(entry.rank)} text-white rounded-full flex items-center justify-center text-xs font-bold`}
            >
              {entry.rank}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-900 truncate">{entry.name}</div>
              <div className={`text-xs font-medium ${getScoreColor(entry.rank)}`}>{entry.score} correct</div>
            </div>
            {getRankIcon(entry.rank)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveLeaderboard
