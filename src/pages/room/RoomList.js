import {Button, Form, Stack} from "react-bootstrap";
import {useState} from "react";
import styles from "./room.module.scss";
import RoomCard from "./RoomCard";

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
            <Stack direction={"horizontal"} className={"justify-content-center m-10"}>
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
            <Stack direction={"horizontal"} gap={10} className={"m-10"}>
                <RoomCard />
                <RoomCard />
            </Stack>
            <Stack direction={"horizontal"} gap={10} className={"m-10"}>
                <RoomCard />
                <RoomCard />
            </Stack>
        </>
    );
}

export default RoomList;