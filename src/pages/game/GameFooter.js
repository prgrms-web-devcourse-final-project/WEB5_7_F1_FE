import {Button, Stack} from "react-bootstrap";
import ThemedSelect from "../../shared/ThemedSelect";
import styles from './game.module.scss'

const GameFooter = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Button variant={"outline-primary"} className={"mb-3"} style={{ display: "inline-block" }}>게임 시작</Button>
            <Stack direction={"horizontal"} className={"justify-content-between me-8 " + styles.borderbox}>
                <Stack className={"m-4"}>
                    <div>방설정</div>
                    <div>문제수 : <span></span></div>
                    <Stack direction={"horizontal"}>제한 시간 : <ThemedSelect /></Stack>
                </Stack>
                <Button variant={"outline-primary"}>퀴즈 선택</Button>
            </Stack>
        </div>
    );
}

export default GameFooter;