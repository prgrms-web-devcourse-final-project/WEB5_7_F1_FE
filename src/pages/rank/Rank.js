// Rank.jsx
import { Button, Form, Stack } from "react-bootstrap";
import { useState } from "react";
import styles from './rank.module.scss';
import TableBackGroundCard from "../../shared/TableBackGroundCard";
import FlexibleTable from "../../shared/table/FlexibleTable";
import PaginationNavigator from '../../layout/PaginationNavigator.js';

const initColumns = [
  { accessorKey: "rank", header: "순위" },
  { accessorKey: "nickname", header: "닉네임" },
  { accessorKey: "winLoss", header: "전적" },
  { accessorKey: "score", header: "점수" },
];

const sampleData = [
  { rank: 1, nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
  { rank: 2, nickname: "경찬", winLoss: "48전 28승 20패", score: "4825점" },
  { rank: 3, nickname: "강현", winLoss: "45전 27승 18패", score: "4720점" },
  { rank: 4, nickname: "민수", winLoss: "42전 25승 17패", score: "4615점" },
  { rank: 5, nickname: "지영", winLoss: "40전 24승 16패", score: "4510점" },
  { rank: 6, nickname: "현우", winLoss: "38전 22승 16패", score: "4405점" },
  { rank: 7, nickname: "수진", winLoss: "35전 20승 15패", score: "4300점" },
  { rank: 8, nickname: "태현", winLoss: "33전 19승 14패", score: "4195점" },
  { rank: 9, nickname: "은지", winLoss: "30전 17승 13패", score: "4090점" },
  { rank: 10, nickname: "준호", winLoss: "28전 15승 13패", score: "3985점" },
];

const Rank = () => {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const handleSearchClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🔍 검색 버튼 클릭됨");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("🔍 엔터키 눌림");
      handleSearchClick(e);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`페이지 ${page}로 이동`);
  };

  // 현재 페이지 데이터
  const currentData = sampleData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <FlexibleTable initColumns={initColumns} data={currentData} />
          </TableBackGroundCard>
          
          {/* Pagination */}

                  <PaginationNavigator
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
                />
        </div>
      </div>


    </div>
  );
};

export default Rank;