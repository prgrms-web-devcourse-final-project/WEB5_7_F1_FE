
import React from 'react';
import styles from './room.module.scss';

const RoomCard = ({ room, onEnterRoom }) => {
  const isFullRoom = room.currentUserCount >= room.maxUserCount;
  const isPrivate = room.locked;

  const handleEnterRoom = () => {
    if (!isFullRoom && onEnterRoom) {
      onEnterRoom(room);
    }
  };

  return (
    <div className={styles.quizCard} onClick={handleEnterRoom}>
      <div className={styles.hoverCard}>
        <h3>{room.roomName}</h3>
        <p>{room.description}</p>
        <p>제작자: {room.creator}</p>
        <p>총 문제: {room.numberOfQuestions} 문제</p>
      </div>
      
      <div className={styles.quizThumbnail}>
        {isPrivate && (
          <div className={styles.privateIndicator}>
            🔒 비밀방
          </div>
        )}
        <img src={room.thumbnailUrl} alt="Quiz Thumbnail" />
      </div>
      
      <div className={styles.quizInfo}>
        <h3 className={styles.quizTitle}>{room.title}</h3>
        <div className={styles.quizStats}>
          <span className={`${styles.quizParticipants} ${isFullRoom ? styles.full : ''}`}>
            인원: {room.currentUserCount} / {room.maxUserCount}
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