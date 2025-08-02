"use client"

import { useState, useEffect } from "react"
import RoomCard from "./RoomCard"
import CreateRoomModal from "./CreateRoomModal"
import FullPersonModal from "./FullPersonModal"
import RoomPasswordModal from "./RoomPasswordModal"
import styles from "./room.module.scss"
import PaginationNavigator from "../../layout/PaginationNavigator.js"
import { useApiQuery } from "../../hooks/useApiQuery";
import axios from "axios";
import { useApiMutation } from "../../hooks/useApiMutation";
import { useNavigate } from "react-router-dom";
import useRoomSseClient from "../../hooks/useRoomSseClient";
import Spinner from "../../shared/Spinner";

const roomsRequest = async () => {
  const response = await axios.get(`/rooms`);
  return response.data;
}

const createRoomRequest = async (params) => {
  const response = await axios.post(`/rooms`, params);
  return response.data;
}

const enterRoomRequest = async (params) => {
  const response = await axios.post(`/rooms/enterRoom`, params, { skipAuthInterceptor: true });
  return response.data;
}

const RoomList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(""); // 실제 적용된 검색어
  const [currentPage, setCurrentPage] = useState(1);
  const [allRooms, setAllRooms] = useState([]); // 원본 데이터
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  const ROOMS_PER_PAGE = 8; // 한 페이지에 방 하나

  const { data, isLoading } = useApiQuery(
    ["rooms"],
    () => roomsRequest(),
  );

  useRoomSseClient((event) => {
    const { type, payload } = event;
    setAllRooms((prev) => {
      switch (type) {
        case 'CREATE':
          if (prev.some((room) => room.roomId === payload.payload.roomId)) {
            return prev;
          }
          return [...prev, payload.payload];
        case 'UPDATE':
          return prev.map((room) =>
            room.roomId === payload.payload.roomId ? { ...room, ...payload.payload } : room
          );
        case 'DELETE':
          return prev.filter((room) => room.roomId !== payload.payload.roomId);
        default:
          return prev;
      }
    });
  });

  const { mutate: createRoomMutate, isLoading: isCreateRoomLoading } = useApiMutation(createRoomRequest, {
    onSuccess: (data) => {
      navigate(`/room/${data.roomId}`);
    },
  });

  const { mutate: enterRoomMutate, isLoading: isEnterRoomLoading } = useApiMutation(enterRoomRequest, {
    onSuccess: (data, variables) => {
      setIsPasswordModalOpen(false);
      setSelectedRoom(null);
      navigate(`/room/${variables.roomId}`);
    }
  });

  useEffect(() => {
    if (data) {
      setAllRooms(data.rooms);
    }
  }, [data]);

  useEffect(() => {
    // prefix로 저장된 방 관련 키들 삭제
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("enteredRoom_")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // 필터링: 적용된 검색어 기준
  const filteredRooms = appliedSearchTerm
    ? allRooms.filter((room) => room.roomName.toLowerCase().includes(appliedSearchTerm.toLowerCase()))
    : allRooms;

  // 페이지 계산
  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROOMS_PER_PAGE;
  const currentRooms = filteredRooms.slice(startIndex, startIndex + ROOMS_PER_PAGE);

  // currentPage가 너무 크면 자동 보정
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    const trimmed = searchTerm.trim();
    setAppliedSearchTerm(trimmed); // 빈 문자열이면 전체 목록
  }

  const handleReset = () => {
    setSearchTerm('');
    setAppliedSearchTerm('');
    setCurrentPage(1);
  }

  const handleCreateRoom = (newRoomData) => {
    createRoomMutate(newRoomData);
    setIsModalOpen(false);
  }

  const handleEnterRoom = (room) => {
    if (room.locked) {
      setSelectedRoom(room);
      setIsPasswordModalOpen(true);
    } else {
      enterRoomMutate({ roomId: room.roomId, password: "" });
    }
  }

  const handlePasswordSubmit = (room, password) => {
    enterRoomMutate({ roomId: room.roomId, password: password });
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  // 빈 카드 채우기 (한 페이지당 1개라 필요 없으면 제거 가능)
  const emptyCards = Array(Math.max(0, ROOMS_PER_PAGE - currentRooms.length)).fill(null);

  return (
    <div className={styles.mainContainer}>
      <Spinner show={isLoading || isEnterRoomLoading || isCreateRoomLoading} />
      <main className={styles.mainContent}>
        {/* Search Section */}
        <section className={styles.searchSection}>
          <div className={styles.searchInputGroup}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="방 제목을 입력하세요..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // appliedSearchTerm은 Enter(검색)할 때만 바뀜
                }}
                onKeyDown={handleKeyDown}
              />
              {searchTerm && (
                <button className={styles.clearButton} onClick={handleReset}>
                  ✕
                </button>
              )}
            </div>
            <button className={styles.searchButton} onClick={handleSearch}>
              검색
            </button>
          </div>
          <button className={styles.createRoomBtn} onClick={() => setIsModalOpen(true)}>
            방 생성하기
          </button>
        </section>

        {/* 검색 결과 정보 */}
        {appliedSearchTerm && (
          <div className={styles.searchInfo}>
            <p>
              "{appliedSearchTerm}" 검색 결과: {filteredRooms.length}개의 방
            </p>
          </div>
        )}

        {/* Room Grid (한 페이지당 하나) */}
        <section className={styles.quizGrid}>
          {currentRooms.map((room) => (
            <RoomCard key={room.roomId} room={room} onEnterRoom={handleEnterRoom} />
          ))}
          {emptyCards.map((_, index) => (
            <div key={`empty-${index}`} style={{ visibility: "hidden" }}></div>
          ))}
        </section>

        {/* 검색 결과가 없을 때 */}
        {filteredRooms.length === 0 && appliedSearchTerm && (
          <div className={styles.noResults}>
            <p>검색 결과가 없습니다.</p>
            <button
              onClick={() => {
                handleReset();
              }}
            >
              전체 방 보기
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationNavigator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </main>

      <CreateRoomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateRoom} />

      <FullPersonModal isOpen={isFullModalOpen} onClose={() => setIsFullModalOpen(false)} />

      <RoomPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handlePasswordSubmit}
        room={selectedRoom}
      />
    </div>
  )
}

export default RoomList