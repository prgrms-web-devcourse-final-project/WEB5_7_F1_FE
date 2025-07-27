// Rank.jsx
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import styles from './rank.module.scss';
import TableBackGroundCard from "../../shared/TableBackGroundCard";
import FlexibleTable from "../../shared/table/FlexibleTable";
import PaginationNavigator from '../../layout/PaginationNavigator.js';
import axios from "axios";
import {useApiQuery} from "../../hooks/useApiQuery";
import {useQueryParam} from "../../hooks/QueryParam";

const initColumns = [
  { accessorKey: "rank", header: "순위" },
  { accessorKey: "nickname", header: "닉네임" },
  { accessorKey: "winLoss", header: "전적" },
  { accessorKey: "score", header: "점수" },
];

const rankRequest = async (params) => {
  const response = await axios.get(`/stats/rankings`, {params});
  return response.data;
};

const Rank = () => {
  const [keyword, setKeyword] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [params, setParams] = useQueryParam();
  const { data } = useApiQuery(
      ['/stats/rankings', params], // queryKey에 params 포함
      () => rankRequest(params)
  );

  useEffect(() => {
    if (data) {
      const processedRows = data.ranks.map((item) => {
        return {
          rank: item.rank,
          nickname: item.nickname,
          winLoss: `${item.totalGames}전 ${item.winningGames}승 ${item.totalGames - item.winningGames}패`,
          score: `${item.score}점`
        }
      })
      setTableRows(processedRows);
    }
  }, [data])

  const handleSearchClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🔍 검색 버튼 클릭됨");
    setParams({
      page: 1,
      nickname: keyword.trim()
    })
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("🔍 엔터키 눌림");
      handleSearchClick(e);
    }
  };

  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitle}>
            <h1 className={styles.mainTitle}>뇌이싱 랭킹</h1>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <Form onSubmit={handleSearchClick}>
            <div className={styles.searchInputWrapper}>
              <Form.Control
                type="text"
                placeholder="플레이어 닉네임을 검색하세요..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.searchInput}
              />
              <Button type="submit" className={styles.searchButton}>
                검색
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Rankings Section */}
      <div className={styles.rankingsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>드라이버 스탠딩</h2>
        </div>
        
        <div className={styles.tableContainer}>
          <TableBackGroundCard className={styles.rankingCard}>
            <FlexibleTable initColumns={initColumns} data={tableRows} />
          </TableBackGroundCard>
          
          {/* Pagination */}
          <PaginationNavigator currentPage={data?.currentPage} totalPages={data?.totalPages}
                               onPageChange={(page) => setParams({
                                 ...params
                                 ,page: page,
                               })}/>
        </div>
      </div>


    </div>
  );
};

export default Rank;