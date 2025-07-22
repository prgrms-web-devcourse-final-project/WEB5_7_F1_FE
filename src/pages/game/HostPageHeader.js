import {Flag, Lock, LogOut, Users} from "lucide-react";
import {useRecoilValue} from "recoil";
import {roomSettingAtom} from "../../state/atoms";

const HostPageHeader = ({ isHost, handleExitRoomClick }) => {
    const roomSetting = useRecoilValue(roomSettingAtom);

    return (
        <header className="bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Flag className="w-6 h-6" />
                        <h1 className="text-xl font-bold">{roomSetting?.roomName}</h1>
                    </div>
                    {roomSetting?.locked && <div
                        className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                        <Lock className="w-4 h-4"/>
                        <span className="text-sm">비공개 방</span>
                    </div>}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span className="font-semibold">{roomSetting?.currentUserCount}/{roomSetting?.maxUserCount} 플레이어</span>
                    </div>
                    {isHost && <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">👑 방장</span>
                    </div>}
                    <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                            onClick={handleExitRoomClick}>
                        <LogOut className="w-4 h-4 mr-2 inline" />방 나가기
                    </button>
                </div>
            </div>
        </header>
    );
}

export default HostPageHeader