"use client"

import {useEffect, useState} from "react"
import { MessageCircle, Send, Car, Bell } from "lucide-react"
import {useRecoilState, useRecoilValue} from "recoil";
import {
    chatAtom,
    playerListAtom,
    stompSendMessageAtom, systemNoticeAtom
} from "../../../state/atoms";
import {useParams} from "react-router-dom";

function ChatSection() {
    const { id: roomId } = useParams();
    const [chatMessage, setChatMessage] = useState("");
    const sendMessage = useRecoilValue(stompSendMessageAtom);
    const [messages, setMessages] = useState([]);
    const [newChat, setNewChat] = useRecoilState(chatAtom); // 단일 채팅 수신
    const [newNotice, setNewNotice] = useRecoilState(systemNoticeAtom); // 단일 채팅 수신
    const playerList = useRecoilValue(playerListAtom);

    // 닉네임 → color 매핑 함수
    const getColorByNickname = (nickname) => {
        return playerList.find((p) => p.nickname === nickname)?.color || "text-gray-500";
    };

    // 수신된 채팅을 누적하면서 색상도 같이 적용
    useEffect(() => {
        if (newChat) {
            const color = getColorByNickname(newChat.nickname);
            setMessages((prev) => [...prev, { ...newChat, color, type: 'chat' }]);
            setNewChat(null);
        }
        if (newNotice) {
            setMessages((prev) => [...prev, { ...newNotice, type: 'notice' }]);
            setNewNotice(null);
        }
    }, [newChat, newNotice, playerList]);

    const handleSendMessage = () => {
      if (chatMessage.trim()) {
          const chatPayload = {
              type: "CHAT",
              message: {
                  nickname: "shson",
                  message: "와 이 문제 너무 어렵다!",
                  timestamp: "2025-07-04T20:16:10Z",
              },
          };
          sendMessage(`/pub/room/chat/${roomId}`, JSON.stringify(chatPayload));
          setChatMessage("");
      }
  }

  return (
      <div className="flex-1 border-t border-gray-200 flex flex-col">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
            실시간 채팅
          </h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg) => (
              msg.type === 'chat' ?
              <div key={msg.id} className="flex items-start space-x-3">
                <Car className={`w-5 h-5 mt-0.5 ${msg.color ? msg.color : "text-gray-500"}`} />
                <div>
                  <div className="text-sm! font-medium text-gray-600">{msg.nickname}</div>
                  <div className="text-sm! text-gray-800">{msg.message}</div>
                </div>
              </div>
                  : <div key={msg.id} className="flex items-start space-x-3">
                      <Bell className={`w-5 h-5 mt-0.5 "text-gray-500"`} />
                      <div>
                          <div className="text-sm! text-gray-800">{msg.noticeMessage}</div>
                      </div>
                  </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
  )
}

export default ChatSection
