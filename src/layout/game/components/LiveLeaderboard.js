import {Trophy} from "lucide-react"
import {useRecoilValue} from "recoil";
import {rankUpdateAtom} from "../../../state/atoms";
import {useEffect, useState} from "react";

function LiveLeaderboard() {
  const ranks = useRecoilValue(rankUpdateAtom);
  const [sortedRanks, setSortedRanks] = useState([]);

  useEffect(() => {
      if (ranks) {
        setSortedRanks(
            [...ranks]  // 원본 복사
            .sort((a, b) => b.correctCount - a.correctCount)
            .map((item, index) => ({
              ...item,
              rank: index + 1
            }))
        );
      }
  }, [ranks])

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
        return "bg-gray-400"
      case 3:
        return "bg-orange-500"
      default:
        return "text-gray-500"
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
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
          실시간 랭킹 ({sortedRanks.length})
        </h3>
        <div className="space-y-0">
          {sortedRanks.map((rank) => (
              <div key={rank.rank} className={`flex items-center space-x-3 p-1 rounded-md ${getRankBg(rank.rank)}`}>
                <div
                    className={`w-7 h-7 ${getRankColor(rank.rank)} text-white rounded-full flex items-center justify-center text-sm font-bold`}
                >
                  {rank.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{rank.nickname}</div>
                </div>
                <div className={`text-sm font-medium ${getScoreColor(rank.rank)}`}>정답 {rank.correctCount}개</div>
              </div>
          ))}
        </div>
      </div>
  )
}

export default LiveLeaderboard
