import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function useStompClient(roomId, onMessage) {
    const stompClientRef = useRef(null);
    const hasSubscribedRef = useRef(false);
    useEffect(() => {
        const stompClient = new Client({
            brokerURL: `wss://brainrace.duckdns.org:7080/ws/game-room`,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("🔌 STOMP connected");
                // 구독
                if (!hasSubscribedRef.current) {
                    hasSubscribedRef.current = true;
                    stompClient.subscribe(`/sub/room/${roomId}`, (message) => {
                        const payload = JSON.parse(message.body);
                        console.log("📥 메시지 수신:", payload);

                        // 👉 외부에서 전달한 콜백 실행
                        if (onMessage) onMessage(payload);
                    });

                    // ✅ 자동으로 방 입장 메시지 퍼블리시
                    stompClient.publish({
                        destination: `/pub/room/initializeRoomSocket/${roomId}`,
                        body: "", // 빈 body 명시적 전달
                    });
                } //if (!hasSubscribedRef.current) { end
            }, //onConnect end
            onStompError: (frame) => {
                console.error("❌ STOMP error", frame);
            },
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            if (stompClientRef.current?.connected) {
                stompClientRef.current.deactivate();
                console.log("🔌 STOMP disconnected");
            }
            hasSubscribedRef.current = false;
        };
    }, [roomId, onMessage]);

    // ✅ 메시지 전송 함수 반환
    const sendMessage = (destination, body) => {
        console.log("sendMessage: ", destination, body, stompClientRef.current?.connected)
        if (stompClientRef.current?.connected) {
            stompClientRef.current.publish({
                destination,
                body,
            });
        } else {
            console.warn("STOMP 연결되지 않음");
        }
    };

    return {sendMessage};
}
