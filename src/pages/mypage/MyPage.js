import { useState } from 'react';
import useConfirm from '../../hooks/useConfirm';
import { useNavigate } from 'react-router-dom';
import { Trophy, BarChart3 } from 'lucide-react';

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

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: 'white',
    color: '#111827',
    position: 'relative',
  };

  const backgroundPatternStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: `
      linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.05) 50%, transparent 60%),
      linear-gradient(-45deg, transparent 40%, rgba(0,0,0,0.05) 50%, transparent 60%)
    `,
    backgroundSize: '20px 20px',
    zIndex: -1,
  };

  const mainStyle = {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  };

  const cardStyle = {
    maxWidth: '1024px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #f9fafb 0%, white 50%, #f9fafb 100%)',
    border: '2px solid rgba(220, 38, 38, 0.3)',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    background: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 50%, #000000 100%)',
    borderBottom: '1px solid rgba(220, 38, 38, 0.3)',
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const headerTextStyle = {
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: '900',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  };

  const formStyle = {
    padding: '2rem',
  };

  const sectionStyle = {
    marginBottom: '1.5rem',
  };

  const inputRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#111827',
    width: '80px',
    flexShrink: 0,
  };

  const inputStyle = {
    flex: '1',
    maxWidth: '300px',
    padding: '0.5rem 1rem',
    border: '1px solid linear-gradient(145deg, #ff1e1e, #e10600)',
    borderRadius: '0.25rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    background: 'linear-gradient(145deg, #ff1e1e, #e10600)', 
    color: 'white',
    fontWeight: '600',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const statsCardStyle = {
    background: 'linear-gradient(135deg, #f9fafb 0%, white 50%, #f9fafb 100%)',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  };

  const statsHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  };

  const statsRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    paddingTop: '1.5rem',
  };

  const saveButtonStyle = {
    padding: '0.75rem 1.5rem',
    border: '2px solid #dc2626',
    color: '#dc2626',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const deleteButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(145deg, #ff1e1e, #e10600)', // 그라디언트 적용!
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const rankBadgeStyle = {
    background: 'linear-gradient(145deg, #ff1e1e, #e10600)', // 그라디언트 적용!
    color: 'white',
    fontWeight: 'bold',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
  };

  const scoreStyle = {
    color: '#dc2626',
    fontWeight: '900',
    fontSize: '1.25rem',
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPatternStyle}></div>

      <main style={mainStyle}>
        <div style={cardStyle}>
          <div style={headerStyle}>
            <Trophy size={24} color='#fbbf24' />
            <span style={headerTextStyle}>프로필 정보</span>
          </div>

          <div style={formStyle}>
            <form>
              {/* 닉네임 섹션 */}
              <div style={inputRowStyle}>
                <label style={labelStyle}>닉네임</label>
                <input
                  type='text'
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#dc2626')}
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(220, 38, 38, 0.5)')
                  }
                />
                <button
                  type='button'
                  onClick={handleDuplicateCheck}
                  style={buttonStyle}
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
              <div style={statsCardStyle}>
                <div style={statsHeaderStyle}>
                  <BarChart3 size={20} color='#dc2626' />
                  <span
                    style={{
                      fontWeight: '900',
                      color: '#111827',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    게임 통계
                  </span>
                </div>

                <div>
                  <div style={statsRowStyle}>
                    <label style={labelStyle}>전적</label>
                    <span style={{ color: '#374151', fontWeight: '600' }}>
                      {userStats.totalGames}전 {userStats.wins}승{' '}
                      {userStats.losses}패
                    </span>
                  </div>

                  <div style={statsRowStyle}>
                    <label style={labelStyle}>점수</label>
                    <span style={scoreStyle}>{userStats.score}점</span>
                  </div>

                  <div style={statsRowStyle}>
                    <label style={labelStyle}>현재 랭킹</label>
                    <span style={rankBadgeStyle}>
                      {userStats.currentRank}위
                    </span>
                  </div>
                </div>
              </div>

              {/* 버튼 영역 */}
              <div style={buttonGroupStyle}>
                <button
                  type='button'
                  onClick={handleSaveClick}
                  style={saveButtonStyle}
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
                  style={deleteButtonStyle}
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