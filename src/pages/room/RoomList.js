import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import styles from "./room.module.scss";
import RoomCard from "./RoomCard";

const roomCardList = [
    { id: 1, isSecret: false, isPlay: false, title: '겜할 사람 급구 ㄱ', totalPerson: 8, currentPerson: 4 },
    { id: 2, isSecret: true, isPlay: true, title: '용호초로 나온나', totalPerson: 8, currentPerson: 8 },
    { id: 3, isSecret: false, isPlay: false, title: '친친만', totalPerson: 2, currentPerson: 2 },
    { id: 4, isSecret: true, isPlay: false, title: '놀 사람', totalPerson: 8, currentPerson: 4 },
]; // 필요 시 실제 데이터로 교체

const RoomList = () => {
    const [keyword, setKeyword] = useState("")

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
            <Stack direction={"horizontal"} className={"justify-content-center mx-10 mt-10"}>
                <div className={styles.borderbox} style={{ width: "500px" }}>
                    <Stack direction={"horizontal"} gap={5} className={"m-3"}>
                        <Form.Label>방이름</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="제목을 입력하세요.."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button>찾기</Button>
                    </Stack>
                </div>
            </Stack>
            <Button variant={"warning"} className={"ms-auto me-10 text-black"}>방 생성하기</Button>
            {roomCardList.reduce((rows, _, index) => {
                if (index % 2 === 0) {
                    rows.push(roomCardList.slice(index, index + 2));
                }
                return rows;
            }, []).map((rowItems, rowIndex) => (
                <Row key={rowIndex} className="m-10">
                    {rowItems.map((item, colIndex) => (
                        <Col key={colIndex} md={6} className={"d-flex justify-content-center"}>
                            <RoomCard room={item}/>
                        </Col>
                    ))}
                </Row>
            ))}
        </>
    );
}

export default RoomList;