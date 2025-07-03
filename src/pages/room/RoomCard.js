import {Button, Card, Form, Image, Stack} from "react-bootstrap";
import sampleImg from "../../assets/images/sample.png"
import styles from "./room.module.scss"

const RoomCard = () => {
    return (
        <Card className={styles.borderbox} >
            <Card.Body>
                <Stack direction={"horizontal"} className={"m-5"}>
                    <Image src={sampleImg} width={100} height={80}/>
                    <Stack gap={5}>
                        <div>겜할사람 급구</div>
                        <Stack direction={"horizontal"} gap={3}>
                            <Form>
                                <Form.Check />
                            </Form>
                            <span>인원</span>
                            <span>4/8</span>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={"horizontal"} className={"justify-content-center m-5"}>
                    <Button className={"w-50"}>입장하기</Button>
                </Stack>
            </Card.Body>
        </Card>
    );
}

export default RoomCard;