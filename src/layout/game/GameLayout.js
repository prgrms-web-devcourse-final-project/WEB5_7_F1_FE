import {Outlet, useNavigate, useParams} from "react-router-dom";
import Sidebar from "./Sidebar";
import {useSetRecoilState} from "recoil";
import {
    chatAtom, gameResultAtom,
    gameSettingAtom,
    loginUserAtom,
    playerListAtom,
    questionResultAtom,
    questionsAtom,
    questionStartAtom,
    rankUpdateAtom,
    roomSettingAtom,
    stompSendMessageAtom,
    systemNoticeAtom
} from "../../state/atoms";
import useStompClient from "../../hooks/useStompClient";
import {useCallback, useEffect} from "react";
import {useApiQuery} from "../../hooks/useApiQuery";
import axios from "axios";

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

const authMeRequest = async () => {
    const response = await axios.get(`/auth/me`);
    return response.data;
};

const GameLayout = () => {
    const { id: roomId } = useParams();
    const setPlayerList = useSetRecoilState(playerListAtom);
    const setRoomSetting = useSetRecoilState(roomSettingAtom);
    const setGameSetting = useSetRecoilState(gameSettingAtom);
    const setChat = useSetRecoilState(chatAtom);
    const setQuestions = useSetRecoilState(questionsAtom);
    const setQuestionStart = useSetRecoilState(questionStartAtom);
    const setQuestionResult = useSetRecoilState(questionResultAtom);
    const setRankUpdate = useSetRecoilState(rankUpdateAtom);
    const setGameResult = useSetRecoilState(gameResultAtom);
    const setSystemNotice = useSetRecoilState(systemNoticeAtom);
    const setSendMessage = useSetRecoilState(stompSendMessageAtom);
    const setLoginUser = useSetRecoilState(loginUserAtom);
    const navigate = useNavigate();

    const { isLoading, data } = useApiQuery(
        ["authme"],
        () => authMeRequest(),
    );

    useEffect(() => {
        if (data) {
            setLoginUser(data);
        }
    }, [data])

    // 메시지를 처리하는 콜백
    const handleStompMessage = useCallback((payload) => {
        console.log('receive message: ', payload)
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
            case "GAME_START":
                setQuestions(payload.message);
                break;
            case "QUESTION_START":
                setQuestionStart(payload.message);
                break;
            case "QUESTION_RESULT":
                setQuestionResult(payload.message);
                break;
            case "RANK_UPDATE":
                setRankUpdate(payload.message.rank);
                break;
            case "GAME_RESULT":
                setGameResult(payload.message.result);
                break;
            case "EXIT_SUCCESS":
                navigate("/room");
                break;
            default:
                console.warn("알 수 없는 메시지", payload);
        }
    }, [setPlayerList, setRoomSetting, setGameSetting, setSystemNotice, setChat]);

    const { sendMessage } = useStompClient(roomId, handleStompMessage);

    useEffect(() => {
        console.log('📦 sendMessage:', sendMessage);
        if (sendMessage) {
            setSendMessage(() => sendMessage); // Recoil 전역 등록
        }
    }, [sendMessage]);

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