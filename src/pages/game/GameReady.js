import GameHeader from "./GameHeader";
import {Stack} from "react-bootstrap";
import GameBody from "./GameBody";
import GameFooter from "./GameFooter";

const GameReady = () => {
    return (
        <Stack direction="vertical" className={"justify-content-between"} style={{ height: '90vh' }}>
            <GameHeader />
            <GameBody />
            <GameFooter />
        </Stack>

    );
}

export default GameReady;