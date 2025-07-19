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
];

function Sidebar() {
    const location = useLocation();
    const isGamePlay = location.pathname.includes("/play");

    return (
        <aside className="w-96 bg-white border-r border-gray-200 flex flex-col">
            {isGamePlay ? <LiveLeaderboard entries={leaderboardData} /> : <ParticipantsList />}
            <ChatSection />
        </aside>
    )
}

export default Sidebar
