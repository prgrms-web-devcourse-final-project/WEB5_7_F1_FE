import { useEffect, useRef, useState } from 'react';

let eventSource = null;

export default function useRoomSseClient(onRoomEvent) {
    const onRoomEventRef = useRef(onRoomEvent);
    const [connected, setConnected] = useState(false);

    // 최신 콜백 유지
    useEffect(() => {
        onRoomEventRef.current = onRoomEvent;
    }, [onRoomEvent]);

    useEffect(() => {
        if (eventSource) return;

        eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/sub/room.list`);

        eventSource.onopen = () => {
            console.log('✅ SSE 연결됨');
            setConnected(true);
        };

        eventSource.onmessage = (event) => {
            try {
                const payload = JSON.parse(event.data);
                onRoomEventRef.current?.(payload); // 예: { type: 'ROOM_CREATED', data: { ... } }
            } catch (e) {
                console.error('❌ SSE 메시지 파싱 실패', e);
            }
        };

        eventSource.onerror = (err) => {
            console.error('❌ SSE 연결 오류:', err);
            eventSource.close();
            eventSource = null;
            setConnected(false);
        };

        return () => {
            eventSource?.close();
            eventSource = null;
            setConnected(false);
        };
    }, []);

    return {
        connected,
    };
}
