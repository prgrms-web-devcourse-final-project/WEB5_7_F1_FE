import { useLocation } from "react-router-dom"
import LiveLeaderboard from "./components/LiveLeaderboard"
import ParticipantsList from "./components/ParticipantsList"
import ChatSection from "./components/ChatSection"

function Sidebar() {
    const location = useLocation();
    const isGamePlay = location.pathname.includes("/play");

    return (
        <aside className="w-96 h-full min-h-0 flex flex-col border-r border-gray-200 bg-white">
            <div>
                {isGamePlay ? <LiveLeaderboard /> : <ParticipantsList />}
            </div>
            <div className="flex-1 min-h-0">
                <ChatSection />
            </div>
        </aside>
    )
}

export default Sidebar
