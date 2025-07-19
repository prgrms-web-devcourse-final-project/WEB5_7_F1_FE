import {Outlet, useNavigate, useParams} from "react-router-dom";
import Sidebar from "./Sidebar";
import {useSetRecoilState} from "recoil";
import {
    chatAtom,
    gameSettingAtom,
    playerListAtom,
    roomSettingAtom, stompSendMessageAtom, systemNoticeAtom
} from "../../state/atoms";
import useStompClient from "../../hooks/useStompClient";
import {useCallback, useEffect} from "react";

const PLAYER_COLORS = [
    "text-red-600",
    "text-blue-600",
    "text-red-500",
    "text-orange-500",
    "text-cyan-500",
    "text-green-600",
    "text-purple-600",
    "text-pink-600",
];

const GameLayout = () => {
    const { id: roomId } = useParams();
    const setPlayerList = useSetRecoilState(playerListAtom);
    const setRoomSetting = useSetRecoilState(roomSettingAtom);
    const setGameSetting = useSetRecoilState(gameSettingAtom);
    const setChat = useSetRecoilState(chatAtom);
    const setSystemNotice = useSetRecoilState(systemNoticeAtom);
    const setSendMessage = useSetRecoilState(stompSendMessageAtom);
    const navigate = useNavigate();

    // 메시지를 처리하는 콜백
    const handleStompMessage = useCallback((payload) => {
        switch (payload.type) {
            case "PLAYER_LIST":
                const { host, players } = payload.message;
                const processedPlayers = players.map((player, index) => {
                    let status = "waiting";
                    if (player.nickname === host) {
                        status = "host";
                    } else if (player.ready) {
                        status = "ready";
                    }
                    return {
                        ...player,
                        status,
                        color: PLAYER_COLORS[index] || "text-gray-500",
                    };
                });
                setPlayerList(processedPlayers);
                break;
            case "ROOM_SETTING":
                setRoomSetting(payload.message);
                break;
            case "GAME_SETTING":
                setGameSetting(payload.message);
                break;
            case "SYSTEM_NOTICE":
                setSystemNotice(payload.message);
                break;
            case "CHAT":
                setChat(payload.message);
                break;
            default:
                console.warn("알 수 없는 메시지", payload);
        }
    }, [setPlayerList, setRoomSetting, setGameSetting, setChat]);

    const { sendMessage } = useStompClient(roomId, handleStompMessage);
    useEffect(() => {
        setSendMessage(() => sendMessage);
    }, [sendMessage]);

    useEffect(() => {
        if (sendMessage) {
            sendMessage(`/pub/room/initializeRoomSocket/${roomId}`, "");
        }
    }, [sendMessage, roomId]);

    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex flex-grow-1">
                <Sidebar />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default GameLayout;