import {Button, Stack} from "react-bootstrap";
import styles from "./game.module.scss";
import {
    ReactComponent as LockIcon
} from "../../assets/images/icon/ico-lock.svg";

const GameHeader = () => {
    return (
        <div style={{ margin: "2rem 2rem 2rem 0rem" }}>
            <Stack direction={"horizontal"} gap={4}>
                <Stack direction={"horizontal"} className={"justify-content-between w-100 " + styles.borderbox} >
                    <span className={"fs-2 mx-3"}>방 제목<LockIcon style={{ marginLeft: "10px", marginBottom: "10px", height: "40px" }} /></span>
                    <span>참여자 5 / 8</span>
                </Stack>
                <Button variant={"outline-primary"}>나가기</Button>
            </Stack>
        </div>
    );
}

export default GameHeader;