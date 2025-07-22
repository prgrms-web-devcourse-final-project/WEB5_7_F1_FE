"use client"

import { useState, useEffect } from "react"
import RoomCard from "./RoomCard"
import CreateRoomModal from "./CreateRoomModal"
import FullPersonModal from "./FullPersonModal"
import RoomPasswordModal from "./RoomPasswordModal"
import styles from "./room.module.scss"
import PaginationNavigator from "../../layout/PaginationNavigator.js"
import {useApiQuery} from "../../hooks/useApiQuery";
import axios from "axios";
import {useApiMutation} from "../../hooks/useApiMutation";
import {useNavigate} from "react-router-dom";

const roomsRequest = async () => {
  const response = await axios.get(`/rooms`);
  return response.data;
}

const createRoomRequest = async (params) => {
  const response = await axios.post(`/rooms`, params);
  return response.data;
}

const enterRoomRequest = async (params) => {
  const response = await axios.post(`/rooms/enterRoom`, params, {skipAuthInterceptor: true});
  return response.data;
}

const RoomList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchOn, setSearchOn] = useState(false);
  const navigate = useNavigate();
  const ROOMS_PER_PAGE = 8 // 한 페이지당 8개

  const { data, refetch } = useApiQuery(
      ["rooms"],
      () => roomsRequest(),
  );

  const { mutate: createRoomMutate } = useApiMutation(createRoomRequest, {
    onSuccess: (data) => {
      navigate(`/room/${data.roomId}`);
    },
  });

  const { mutate: enterRoomMutate } = useApiMutation(enterRoomRequest, {
    onSuccess: (data, variables) => {
      // 임시로 그냥 모달 닫고 입장했다고 가정
      setIsPasswordModalOpen(false);
      setSelectedRoom(null);
      navigate(`/room/${variables.roomId}`);
    }
  });

  useEffect(() => {
    if (data) {
      setRooms(data.rooms);
      setFilteredRooms(data.rooms);
    }
  }, [data])

  useEffect(() => {
    // prefix로 저장된 방 관련 키들 삭제
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("enteredRoom_")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  const handleSearch = () => {
    const filtered = rooms.filter((room) => room.roomName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredRooms(filtered);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    setSearchOn(true);
  }

  const handleReset = () => {
    setSearchTerm('');
    setFilteredRooms(rooms);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    setSearchOn(false);
  };

  const handleCreateRoom = (newRoomData) => {
    createRoomMutate(newRoomData);
    setIsModalOpen(false);
  }

  const handleEnterRoom = (room) => {
    if (room.locked) {
      setSelectedRoom(room);
      setIsPasswordModalOpen(true)
    } else {
      enterRoomMutate({ roomId: room.roomId, password: "" })
    }
  }

  const handlePasswordSubmit = (room, password) => {
    enterRoomMutate({ roomId: room.roomId, password: password });
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // 현재 페이지에 표시할 방들 계산
  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ROOMS_PER_PAGE
  const endIndex = startIndex + ROOMS_PER_PAGE
  const currentRooms = filteredRooms.slice(startIndex, endIndex)

  // 빈 카드로 채우기 (레이아웃 안정화를 위해)
  const emptyCards = Array(Math.max(0, ROOMS_PER_PAGE - currentRooms.length)).fill(null)

  return (
    <div className={styles.mainContainer}>
      {/* Main Content */}
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
                    setSearchOn(false);
                  }}
                  onKeyPress={handleKeyPress}
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
        {searchTerm && searchOn && (
          <div className={styles.searchInfo}>
            <p>
              "{searchTerm}" 검색 결과: {filteredRooms.length}개의 방
            </p>
          </div>
        )}

        {/* Quiz Grid */}
        <section className={styles.quizGrid}>
          {currentRooms.map((room) => (
            <RoomCard key={room.id} room={room} onEnterRoom={handleEnterRoom} />
          ))}
          {/* 빈 공간을 채우는 투명한 div들 */}
          {emptyCards.map((_, index) => (
            <div key={`empty-${index}`} style={{ visibility: "hidden" }}></div>
          ))}
        </section>

        {/* 검색 결과가 없을 때 */}
        {filteredRooms.length === 0 && searchTerm && (
          <div className={styles.noResults}>
            <p>검색 결과가 없습니다.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setFilteredRooms(dummyRooms)
                setCurrentPage(1)
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