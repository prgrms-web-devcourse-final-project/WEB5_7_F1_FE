import {useEffect, useState} from 'react';
import useConfirm from '../../hooks/useConfirm';
import {useNavigate} from 'react-router-dom';
import {BarChart3, Trophy} from 'lucide-react';
import styles from './mypage.module.scss'
import axios from "axios";
import NicknameForm from "../login/NicknameForm";
import {useApiQuery} from "../../hooks/useApiQuery";
import {useApiMutation} from "../../hooks/useApiMutation";
import Spinner from "../../shared/Spinner";

const userRequest = async () => {
  const response = await axios.get(`/user/me`);
  return response.data;
};

const userDeleteRequest = async () => {
  await axios.delete(`/user/me`);
};

const userEditRequest = async (nickname) => {
  const params = {
    nickname
  };
  await axios.put('/user/me', params);
};

const MyPage = () => {
  const [nickname, setNickname] = useState('빵야빵야');
  const [error, setError] = useState({
    nickname: "",
  });
  const [inputStatus, setInputStatus] = useState({
    nickname: false,
  });
  const { openConfirm } = useConfirm();
  const navigate = useNavigate();
  const { data, isLoading } = useApiQuery(
      ['/user/me'],
      () => userRequest()
  );
  const { mutate: userDeleteMutate, isLoading: isUserDeleteLoading } = useApiMutation(userDeleteRequest, {
    onSuccess: () => {
      // 회원가입 완료 후 방 목록으로 이동
      navigate("/login");
    },
  });

  const { mutate: userEditMutate } = useApiMutation(userEditRequest, {
    onSuccess: () => {
      openConfirm({
        title: '프로필 수정',
        html: <div>저장되었습니다.</div>,
        confirmButtonText: '확인',
      });
    },
  });

  useEffect(() => {
      if (data) {
          setNickname(data.nickname)
      }
  }, [data])

  const handleSaveClick = (e) => {
    e.preventDefault();
    userEditMutate(nickname);
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
      callback: () => userDeleteMutate(),
    });
  };

  return (
    <div className={styles.container}>
      <Spinner show={isLoading || isUserDeleteLoading} />
      <div className={styles.backgroundPattern}></div>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Trophy size={24} color='#fbbf24' />
            <span className={styles.headerText}>프로필 정보</span>
          </div>
          <div className={styles.form}>
            <form className={styles.nicknameForm} onSubmit={handleSaveClick}>
              <NicknameForm
                  nickname={nickname}
                  setNickname={setNickname}
                  error={error}
                  setError={setError}
                  setInputStatus={setInputStatus}
              />

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
                      {data?.totalGames}전 {data?.winningGames}승{' '}
                      {data ? (data.totalGames - data.winningGames) : '' }패
                    </span>
                  </div>
                  <div className={styles.statsRow}>
                    <label className={styles.label}>점수</label>
                    <span className={styles.score}>{data?.score}점</span>
                  </div>
                  <div className={styles.statsRow}>
                    <label className={styles.label}>현재 랭킹</label>
                    <span className={styles.rankBadge}>
                      {data?.rank}위
                    </span>
                  </div>
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className={styles.buttonGroup}>
                <button
                  type='submit'
                  className={styles.saveButton}
                  disabled={!inputStatus.nickname}
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