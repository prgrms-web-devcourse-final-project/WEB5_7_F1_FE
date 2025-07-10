"use client"

import { useState, useEffect } from "react"
import RoomCard from "./RoomCard"
import CreateRoomModal from "./CreateRoomModal"
import FullPersonModal from "./FullPersonModal"
import RoomPasswordModal from "./RoomPasswordModal"
import styles from "./room.module.scss"
import PaginationNavigator from "../../layout/PaginationNavigator.js"

const RoomList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullModalOpen, setIsFullModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  const ROOMS_PER_PAGE = 8 // 한 페이지당 8개

  // 더미 데이터 (실제로는 API에서 가져올 것)
  const dummyRooms = [
    {
      id: 1,
      title: "전진만",
      description: "퀴즈에 대한 설명입니다.",
      creator: "나나나",
      questionCount: 40,
      currentPlayers: 1,
      maxPlayers: 2,
      isPrivate: false,
      thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "농사짓",
      description: "비밀방입니다. 비밀번호가 필요합니다.",
      creator: "나나나",
      questionCount: 40,
      currentPlayers: 2,
      maxPlayers: 3,
      isPrivate: true,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "집만사람 급구",
      description: "퀴즈에 대한 설명입니다.",
      creator: "나나나",
      questionCount: 40,
      currentPlayers: 8,
      maxPlayers: 8,
      isPrivate: false,
      thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      title: "암장 불가(예언)",
      description: "비밀방입니다. 현재 인원이 가득 찼습니다.",
      creator: "나나나",
      questionCount: 40,
      currentPlayers: 8,
      maxPlayers: 8,
      isPrivate: true,
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop",
    },
    {
      id: 5,
      title: "경호초토 나나나",
      description: "퀴즈에 대한 설명입니다.",
      creator: "나나나",
      questionCount: 40,
      currentPlayers: 5,
      maxPlayers: 8,
      isPrivate: false,
      thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=200&fit=crop",
    },
    // 추가 더미 데이터 (8개 이상 표시를 위해)
    {
      id: 6,
      title: "테스트방 1",
      description: "테스트용 방입니다.",
      creator: "테스터",
      questionCount: 20,
      currentPlayers: 3,
      maxPlayers: 6,
      isPrivate: false,
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    },
    {
      id: 7,
      title: "테스트방 2",
      description: "또 다른 테스트용 방입니다.",
      creator: "테스터2",
      questionCount: 30,
      currentPlayers: 2,
      maxPlayers: 4,
      isPrivate: true,
      thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop",
    },
    {
      id: 8,
      title: "테스트방 3",
      description: "세 번째 테스트용 방입니다.",
      creator: "테스터3",
      questionCount: 25,
      currentPlayers: 1,
      maxPlayers: 5,
      isPrivate: false,
      thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=200&fit=crop",
    },
    {
      id: 9,
      title: "테스트방 4",
      description: "네 번째 테스트용 방입니다.",
      creator: "테스터4",
      questionCount: 35,
      currentPlayers: 4,
      maxPlayers: 7,
      isPrivate: false,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    },
    {
      id: 10,
      title: "테스트방 5",
      description: "다섯 번째 테스트용 방입니다.",
      creator: "테스터5",
      questionCount: 15,
      currentPlayers: 6,
      maxPlayers: 8,
      isPrivate: true,
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
    },
  ]

  useEffect(() => {
    // 실제로는 API 호출
    setRooms(dummyRooms)
    setFilteredRooms(dummyRooms)
  }, [])

  const handleSearch = () => {
    // 검색 로직 구현
    const filtered = dummyRooms.filter((room) => room.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredRooms(filtered)
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  const handleCreateRoom = (newRoomData) => {
    console.log("방 생성하기:", newRoomData)
    setIsModalOpen(false)
  }

  const handleEnterRoom = (room) => {
    if (room.currentPlayers >= room.maxPlayers) {
      setIsFullModalOpen(true)
      return
    }

    if (room.isPrivate) {
      setSelectedRoom(room)
      setIsPasswordModalOpen(true)
      return
    }

    // 비밀방 아니면 바로 입장 로직
    console.log("방 입장:", room)
  }

  const handlePasswordSubmit = (password) => {
    // 여기서 실제 비밀번호 검증 로직 또는 API 호출 가능
    console.log(`입력한 비밀번호: ${password} / 방 제목: ${selectedRoom.title}`)
    // 임시로 그냥 모달 닫고 입장했다고 가정
    setIsPasswordModalOpen(false)
    setSelectedRoom(null)
    // 실제 입장 처리 추가 (ex. 페이지 이동 등)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
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
            <input
              type="text"
              className={styles.searchInput}
              placeholder="방 제목을 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
              검색
            </button>
          </div>
          <button className={styles.createRoomBtn} onClick={() => setIsModalOpen(true)}>
            방 생성하기
          </button>
        </section>

        {/* 검색 결과 정보 */}
        {searchTerm && (
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
        roomTitle={selectedRoom ? selectedRoom.title : "비밀방"}
      />
    </div>
  )
}

export default RoomList