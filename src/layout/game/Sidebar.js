import { useLocation } from "react-router-dom"
import LiveLeaderboard from "./components/LiveLeaderboard"
import ParticipantsList from "./components/ParticipantsList"
import ChatSection from "./components/ChatSection"

const leaderboardData = [
    { rank: 1, name: "Lewis Hamilton", score: 12, color: "text-red-600" },
    { rank: 2, name: "Max Verstappen", score: 11, color: "text-blue-600" },
    { rank: 3, name: "Charles Leclerc", score: 10, color: "text-red-500" },
    { rank: 4, name: "Lando Norris", score: 9, color: "text-orange-500" },
    { rank: 5, name: "George Russell", score: 8, color: "text-cyan-500" },
    { rank: 6, name: "Fernando Alonso", score: 7, color: "text-green-600" },
    { rank: 7, name: "Oscar Piastri", score: 6, color: "text-purple-600" },
    { rank: 8, name: "Carlos Sainz", score: 5, color: "text-pink-600" },
]

const participants = [
    { id: "1", name: "Lewis Hamilton", status: "host", color: "text-red-600" },
    { id: "2", name: "Max Verstappen", status: "ready", color: "text-blue-600" },
    { id: "3", name: "Charles Leclerc", status: "ready", color: "text-red-500" },
    { id: "4", name: "Lando Norris", status: "waiting", color: "text-orange-500" },
    { id: "5", name: "George Russell", status: "ready", color: "text-cyan-500" },
    { id: "6", name: "Fernando Alonso", status: "ready", color: "text-green-600" },
    { id: "7", name: "Oscar Piastri", status: "waiting", color: "text-purple-600" },
    { id: "8", name: "Carlos Sainz", status: "ready", color: "text-pink-600" },
]

const chatMessages = [
    { id: "1", user: "Lewis Hamilton", message: "Great question! 🏎️", color: "text-red-600" },
    { id: "2", user: "Max Verstappen", message: "This is getting intense!", color: "text-blue-600" },
    { id: "3", user: "Charles Leclerc", message: "Close race for first place", color: "text-red-500" },
    { id: "4", user: "Lando Norris", message: "Good luck everyone! 🏁", color: "text-orange-500" },
]

function Sidebar() {
    const location = useLocation()
    const isGamePlay = location.pathname.includes("/play")

    return (
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
            {isGamePlay ? <LiveLeaderboard entries={leaderboardData} /> : <ParticipantsList participants={participants} />}
            <ChatSection messages={chatMessages} />
        </aside>
    )
}

export default Sidebar
