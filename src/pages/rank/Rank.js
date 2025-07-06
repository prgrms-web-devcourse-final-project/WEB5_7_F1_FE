import {Button, Form, Stack} from "react-bootstrap";
import {useState} from "react";
import styles from './rank.module.scss'
import TableBackGroundCard from "../../shared/TableBackGroundCard";
import FlexibleTable from "../../shared/table/FlexibleTable";

const initColumns = [
    {
        accessorKey: "nickname",
        header: "닉네임",
    },
    {
        accessorKey: "winLoss",
        header: "전적",
    },
    {
        accessorKey: "score",
        header: "점수",
    },
];

const sampleData = [
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "경찬", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "강현", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
    { nickname: "세희", winLoss: "50전 30승 20패", score: "4931점" },
]

const Rank = () => {
    const [keyword, setKeyword] = useState("");

    // 버튼 클릭 이벤트 처리
    const handleSearchClick = (e) => {
        console.log("🔍 검색 버튼 클릭됨"); // 디버깅용 로그
        e.preventDefault();
        e.stopPropagation();
    }

    // 엔터키 이벤트 처리
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("🔍 엔터키 눌림"); // 디버깅용 로그
            handleSearchClick(e);
        }
    }

    return (
        <>
            <Stack direction={"horizontal"} className={"justify-content-center mt-6"}>
                <h3>전체 뇌이싱 랭킹 👑</h3>
            </Stack>
            <Stack direction={"horizontal"} className={"justify-content-center mx-10 mt-10"}>
                <div className={styles.borderbox} style={{ width: "500px" }}>
                    <Form>
                        <Stack direction={"horizontal"} gap={5} className={"m-3"}>
                            <Form.Control
                                type="text"
                                placeholder="닉네임을 입력하세요.."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <Button>찾기</Button>
                        </Stack>
                    </Form>
                </div>
            </Stack>
            <TableBackGroundCard>
                <FlexibleTable initColumns={initColumns} data={sampleData} />
            </TableBackGroundCard>
        </>
    );
}

export default Rank;