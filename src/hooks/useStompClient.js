// useStompClient.js
import { useEffect, useRef, useMemo, useState } from 'react';
import { Client } from '@stomp/stompjs';

// 싱글톤 관리 변수
let stompClient = null;
let isConnected = false;
let isConnecting = false;

export default function useStompClient(roomId, onMessage) {
    const [ready, setReady] = useState(false);
    const [activeSendMessage, setActiveSendMessage] = useState(null); // 연결 완료 후 세팅될 함수
    const onMessageRef = useRef(onMessage);
    const hasInitializedRoomRef = useRef(false); // ✅ 방 초기화 메시지 중복 방지용

    // 최신 onMessage 핸들러 유지
    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);

    // 최초 1번만 커넥션 시도
    useEffect(() => {
        if (isConnected || isConnecting) return;

        isConnecting = true;

        stompClient = new Client({
            brokerURL: 'wss://brainrace.duckdns.org:7080/ws/game-room',
            reconnectDelay: 5000,
            debug: (msg) => console.log('[STOMP]', msg),
            onConnect: () => {
                console.log('✅ STOMP 연결됨');
                isConnected = true;
                isConnecting = false;
                setReady(true);
            },
            onStompError: (frame) => {
                console.error('❌ STOMP 에러:', frame.headers['message']);
            },
            onDisconnect: () => {
                console.log('🔌 STOMP 연결 종료');
                isConnected = false;
                isConnecting = false;
                setReady(false);
                setActiveSendMessage(null);
                hasInitializedRoomRef.current = false;
            },
        });

        stompClient.activate();
    }, []);

    // roomId 변경 시 구독 (연결 완료 후)
    useEffect(() => {
        if (!stompClient || !isConnected || !roomId) return;

        console.log(`📥 구독 시작: /sub/room/${roomId}`);

        const subscription = stompClient.subscribe(`/sub/room/${roomId}`, (message) => {
            try {
                const payload = JSON.parse(message.body);
                onMessageRef.current?.(payload);
            } catch (err) {
                console.error('❌ 메시지 파싱 실패:', err);
            }
        });

        return () => {
            subscription.unsubscribe();
            console.log(`📤 구독 해제: /sub/room/${roomId}`);
        };
    }, [roomId, ready]);

    // 연결이 완료되면 sendMessage 생성
    useEffect(() => {
        if (!isConnected || !stompClient) return;

        const sendFn = (destination, body) => {
            stompClient.publish({
                destination,
                body: typeof body === 'string' ? body : JSON.stringify(body),
            });
        };

        setActiveSendMessage(() => sendFn);
    }, [ready]);

    // ✅ 최초 1회 initializeRoomSocket 퍼블리시
    useEffect(() => {
        if (!isConnected || !stompClient || !roomId || hasInitializedRoomRef.current === true) return;

        stompClient.publish({
            destination: `/pub/room/initializeRoomSocket/${roomId}`,
            body: '',
        });

        hasInitializedRoomRef.current = true;
        console.log(`🚀 초기화 메시지 전송됨: /pub/room/initializeRoomSocket/${roomId}`);
    }, [roomId, ready]);

    return {
        sendMessage: activeSendMessage, // 처음엔 null, 연결 완료되면 함수
        ready,
    };
}
