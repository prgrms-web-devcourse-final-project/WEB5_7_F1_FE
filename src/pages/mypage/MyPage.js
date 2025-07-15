import { useState } from 'react';
import useConfirm from '../../hooks/useConfirm';
import { useNavigate } from 'react-router-dom';
import { Trophy, BarChart3 } from 'lucide-react';
import styles from './mypage.module.scss'

const userStats = {
  nickname: '빵야빵야',
  totalGames: 50,
  wins: 30,
  losses: 20,
  score: 70,
  currentRank: 3,
};

const MyPage = () => {
  const [nickname, setNickname] = useState('빵야빵야');
  const { openConfirm } = useConfirm();
  const navigate = useNavigate();

  const handleDuplicateCheck = () => {
    openConfirm({
      title: '중복 확인',
      html: <div>사용 가능한 닉네임입니다.</div>,
      confirmButtonText: '확인',
    });
  };

  const handleSaveClick = () => {
    openConfirm({
      title: '프로필 수정',
      html: <div>저장되었습니다.</div>,
      confirmButtonText: '확인',
    });
  };

  const handleExitClick = () => {
    openConfirm({
      title: '탈퇴 확인',
      html: (
        <div>
          정말 탈퇴하시겠어요?
          <br />
          탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.{' '}
        </div>
      ),
      confirmButtonText: '탈퇴',
      callback: () => navigate('/login'),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundPattern}></div>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Trophy size={24} color='#fbbf24' />
            <span className={styles.headerText}>프로필 정보</span>
          </div>
          <div className={styles.form}>
            <form>
              {/* 닉네임 섹션 */}
              <div className={styles.inputRow}>
                <label className={styles.label}>닉네임</label>
                <input
                  type='text'
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = '#dc2626')}
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(220, 38, 38, 0.5)')
                  }
                />
                <button
                  type='button'
                  onClick={handleDuplicateCheck}
                  className={styles.button}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#b91c1c')
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#dc2626')
                  }
                >
                  중복 체크
                </button>
              </div>

              {/* 게임 통계 섹션 */}
              <div className={styles.statsCard}>
                <div className={styles.statsHeader}>
                  <BarChart3 size={20} color='#dc2626' />
                  <span>게임 통계</span>
                </div>
                <div>
                  <div className={styles.statsRow}>
                    <label className={styles.label}>전적</label>
                    <span style={{ color: '#374151', fontWeight: '600' }}>
                      {userStats.totalGames}전 {userStats.wins}승{' '}
                      {userStats.losses}패
                    </span>
                  </div>
                  <div className={styles.statsRow}>
                    <label className={styles.label}>점수</label>
                    <span className={styles.score}>{userStats.score}점</span>
                  </div>
                  <div className={styles.statsRow}>
                    <label className={styles.label}>현재 랭킹</label>
                    <span className={styles.rankBadge}>
                      {userStats.currentRank}위
                    </span>
                  </div>
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className={styles.buttonGroup}>
                <button
                  type='button'
                  onClick={handleSaveClick}
                  className={styles.saveButton}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#dc2626';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#dc2626';
                  }}
                >
                  변경사항 저장
                </button>
                <button
                  type='button'
                  onClick={handleExitClick}
                  className={styles.deleteButton}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#b91c1c')
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = '#dc2626')
                  }
                >
                  회원탈퇴
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;