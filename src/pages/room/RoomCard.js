// import React, { useState } from 'react';

// const roomCardList = [
//   { id: 1, isSecret: false, isPlay: false, title: '겜할 사람 급구 ㄱ', totalPerson: 8, currentPerson: 4 },
//   { id: 2, isSecret: true, isPlay: true, title: '용호초로 나온나', totalPerson: 8, currentPerson: 8 },
//   { id: 3, isSecret: false, isPlay: false, title: '친친만', totalPerson: 2, currentPerson: 2 },
//   { id: 4, isSecret: true, isPlay: false, title: '놀 사람', totalPerson: 8, currentPerson: 4 },
// ];

// const RoomCard = ({ room }) => {
//   const isFullRoom = room.currentPerson >= room.totalPerson;
//   const participationRate = (room.currentPerson / room.totalPerson) * 100;
  
//   return (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-red-300">
//       {/* Header with status indicators */}
//       <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 relative">
//         <div className="absolute top-3 right-3 flex gap-2">
//           {room.isSecret && (
//             <span className="text-yellow-400 text-lg">🔒</span>
//           )}
//           {room.isPlay && (
//             <span className="text-green-400 text-lg animate-pulse">▶️</span>
//           )}
//         </div>
        
//         <h3 className="text-white font-bold text-lg mb-2 pr-16">
//           {room.title}
//         </h3>
        
//         {/* Participants info */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-gray-300">
//             <span className="text-red-400">👥</span>
//             <span className="font-semibold text-white">{room.currentPerson}</span>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-400">{room.totalPerson}</span>
//           </div>
//           <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
//             isFullRoom 
//               ? 'bg-red-500/20 text-red-400' 
//               : room.isPlay 
//                 ? 'bg-green-500/20 text-green-400'
//                 : 'bg-blue-500/20 text-blue-400'
//           }`}>
//             {isFullRoom ? 'FULL' : room.isPlay ? 'RACING' : 'WAITING'}
//           </div>
//         </div>
//       </div>
      
//       {/* Body */}
//       <div className="p-4">
//         {/* Progress bar */}
//         <div className="mb-4">
//           <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div 
//               className={`h-full rounded-full transition-all duration-500 ${
//                 isFullRoom 
//                   ? 'bg-gradient-to-r from-red-500 to-red-600' 
//                   : 'bg-gradient-to-r from-blue-500 to-red-500'
//               }`}
//               style={{ width: `${participationRate}%` }}
//             ></div>
//           </div>
//         </div>
        
//         {/* Join button */}
//         <button 
//           className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
//             isFullRoom 
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//               : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white transform hover:scale-105 shadow-lg hover:shadow-red-500/30'
//           }`}
//           disabled={isFullRoom}
//         >
//           {isFullRoom ? 'ROOM FULL' : 'JOIN RACE'}
//         </button>
//       </div>
//     </div>
//   );
// };

// const CreateRoomModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Create New Room</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-2xl"
//           >
//             ×
//           </button>
//         </div>
//         <div className="space-y-4">
//           <input 
//             type="text" 
//             placeholder="Room Title" 
//             className="w-full bg-gray-50 text-gray-800 rounded-lg px-4 py-3 border border-gray-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
//           />
//           <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all duration-300">
//             CREATE ROOM
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RoomList = () => {
//   const [keyword, setKeyword] = useState("");
//   const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);

//   const handleSearchClick = (e) => {
//     console.log("🔍 검색 버튼 클릭됨");
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       console.log("🔍 엔터키 눌림");
//       handleSearchClick(e);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl font-bold mb-2">
//             RACING LOBBY
//           </h1>
//           <p className="text-red-100 text-lg">Join the ultimate racing experience</p>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         {/* Search and Create Section */}
//         <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <span className="text-gray-400">🔍</span>
//             </div>
//             <input
//               type="text"
//               placeholder="Search rooms..."
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="w-80 bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//             />
//           </div>
          
//           <button
//             onClick={() => setCreateRoomModalOpen(true)}
//             className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
//           >
//             <span>➕</span>
//             CREATE NEW ROOM
//           </button>
//         </div>
        
//         {/* Room Grid - 2x2 layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//           {roomCardList.map((room) => (
//             <RoomCard key={room.id} room={room} />
//           ))}
//         </div>
//       </div>
      
//       <CreateRoomModal isOpen={createRoomModalOpen} onClose={() => setCreateRoomModalOpen(false)} />
//     </div>
//   );
// };

// export default RoomList;


import React from 'react';
import styles from './room.module.scss';

const RoomCard = ({ room, onEnterRoom }) => {
  const isFullRoom = room.currentPlayers >= room.maxPlayers;
  const isPrivate = room.isPrivate;

  const handleEnterRoom = () => {
    if (!isFullRoom && onEnterRoom) {
      onEnterRoom(room);
    }
  };

  return (
    <div className={styles.quizCard} onClick={handleEnterRoom}>
      <div className={styles.hoverCard}>
        <h3>{room.title}</h3>
        <p>{room.description}</p>
        <p>제작자: {room.creator}</p>
        <p>총 문제: {room.questionCount} 문제</p>
      </div>
      
      <div className={styles.quizThumbnail}>
        {isPrivate && (
          <div className={styles.privateIndicator}>
            🔒 비밀방
          </div>
        )}
        <img src={room.thumbnail} alt="Quiz Thumbnail" />
      </div>
      
      <div className={styles.quizInfo}>
        <h3 className={styles.quizTitle}>{room.title}</h3>
        <div className={styles.quizStats}>
          <span className={`${styles.quizParticipants} ${isFullRoom ? styles.full : ''}`}>
            인원: {room.currentPlayers} / {room.maxPlayers}
          </span>
          <button 
            className={styles.quizStatus}
            disabled={isFullRoom}
            onClick={(e) => {
              e.stopPropagation();
              handleEnterRoom();
            }}
          >
            {isFullRoom ? '입장불가' : '입장하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;