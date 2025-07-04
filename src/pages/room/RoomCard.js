import {Button, Card, Form, Image, Overlay, Stack} from "react-bootstrap";
import sampleImg from "../../assets/images/sample.png"
import styles from "./room.module.scss"
import RoomPasswordModal from "./RoomPasswordModal";
import {useRef, useState} from "react";
import FullPersonModal from "./FullPersonModal";
import {useNavigate} from "react-router-dom";
import QuizCard from "../quiz/QuizCard";

const RoomCard = ({ room }) => {
    const [roomPasswordModalOpen, setRoomPasswordModalOpen] = useState(false);
    const [roomFullModalOpen, setRoomFullModalOpen] = useState(false);
    const navigate = useNavigate();
    const [showQuizCard, setShowQuizCard] = useState(false);
    const target = useRef(null);

    const handleRoomEnterClick = () => {
        if (room.currentPerson === room.totalPerson) {
            setRoomFullModalOpen(true);
        } else if (room.isSecret) {
            setRoomPasswordModalOpen(true);
        } else {
            navigate('/room/1');
        }
    }

    return (
        <>
            <div ref={target} onMouseEnter={() => setShowQuizCard(true)} onMouseLeave={() => setShowQuizCard(false)}>
                <Card className={styles.borderbox} >
                    <Card.Body>
                        <Stack direction={"horizontal"} className={"m-5"} gap={5}>
                            <Image src={sampleImg} width={100} height={80}/>
                            <Stack gap={5} >
                                <div className={"text-center " + styles.roomTitle}>{room.title}</div>
                                <Stack direction={"horizontal"} gap={3} className={"justify-content-center"}>
                                    <span className={styles.secretBox}>{room.isSecret && "🔑"}</span>
                                    <span>인원</span>
                                    <span className={"text-center " + styles.personCountBox}>
                                {room.currentPerson + "/" + room.totalPerson}</span>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={"horizontal"} className={"justify-content-center m-5"}>
                            <Button disabled={room.isPlay} className={"w-100"} onClick={handleRoomEnterClick}>
                                {room.isPlay ? "입장 불가 (게임중)" : "입장하기"}
                            </Button>
                        </Stack>
                    </Card.Body>
                    <RoomPasswordModal isOpen={roomPasswordModalOpen} onClose={() => setRoomPasswordModalOpen(false)} />
                    <FullPersonModal isOpen={roomFullModalOpen} onClose={() => setRoomFullModalOpen(false)} />
                </Card>
            </div>
            <Overlay target={target.current} show={showQuizCard} placement="left"
                     flip={true} // ← 자동 위치 변경 활성화
                     popperConfig={{
                         modifiers: [
                             {
                                 name: 'flip',
                                 options: {
                                     fallbackPlacements: ['right', 'top', 'bottom'], // 왼쪽이 안되면 이 순서로 대체
                                 },
                             },
                             {
                                 name: 'preventOverflow',
                                 options: {
                                     boundary: 'viewport', // 뷰포트 기준으로 오버플로우 방지
                                 },
                             },
                             {
                                 name: 'offset',
                                 options: {
                                     offset: [-100, 0], // ← Y축으로 위로 30px 이동
                                 },
                             },
                         ],
                     }}>
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div {...props} style={{...props.style, zIndex: 9999,}}>
                        <QuizCard />
                    </div>
                )}
            </Overlay>
        </>
    );
}

export default RoomCard;