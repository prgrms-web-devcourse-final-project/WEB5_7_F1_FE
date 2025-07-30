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

        eventSource = new EventSource(`${window.__ENV__?.REACT_APP_API_BASE_URL || "https://api-brainrace.duckdns.org"}/sse/lobby`, {withCredentials: true});

        eventSource.onopen = () => {
            console.log('✅ SSE 연결됨');
            setConnected(true);
        };

        const handleEvent = (type) => (event) => {
            try {
                const payload = JSON.parse(event.data);
                console.log(`📨 ${type} 이벤트 수신:`, payload);
                onRoomEventRef.current?.({ type, payload });
            } catch (e) {
                console.error(`❌ ${type} 이벤트 파싱 실패`, e);
            }
        };

        // 🎯 각각의 이벤트 타입 등록
        eventSource.addEventListener('CREATE', handleEvent('CREATE'));
        eventSource.addEventListener('UPDATE', handleEvent('UPDATE'));
        eventSource.addEventListener('DELETE', handleEvent('DELETE'));

        eventSource.onerror = (err) => {
            console.error('❌ SSE 연결 오류:', err);
            // eventSource.close();
            // eventSource = null;
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
