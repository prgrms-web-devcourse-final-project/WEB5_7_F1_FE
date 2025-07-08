import {Form, Stack} from "react-bootstrap";
import styles from './game.module.scss'

const samplePerson = [
    { color: "red", name: '지원', status: '방장' },
    { color: "blue", name: '경찬', status: '준비' },
    { color: "green", name: '강현', status: '준비' },
    { color: "orange", name: '노을', status: '준비' },
    { color: "purple", name: '석훈', status: '준비' },
    { color: "yellow", name: '지현', status: '준비' },
    { color: "pink", name: '영훈', status: '준비' },
    { color: "navy", name: '지아', status: '대기' },
];

const Sidebar = () => {
    return (
        <div className="p-3" style={{ minWidth: "30%", borderRadius: 0 }}>
            <Stack className={`${styles.borderCard}  m-5`} direction="vertical">
                {/* 참여자 목록 */}
                <Stack gap={2} className="m-4 bg-white" style={{ overflowY: 'auto', maxHeight: '200px' }}>
                    참여자 목록
                    {samplePerson.map((item, index) => {
                        return <Stack key={index} direction={"horizontal"} className={"justify-content-between"}>
                            <Stack direction="horizontal" className="align-items-center">
                                <span className={`${styles.colorBox} bg-${item.color}`} />
                                <span>{item.name}</span>
                            </Stack>
                            <span>{item.status}</span>
                        </Stack>
                    })}
                </Stack>
                {/* 채팅 내용 - 고정 높이 + 스크롤 */}
                <Stack
                    gap={2}
                    className="m-4"
                    style={{
                        overflowY: 'auto',
                        // minHeight: "20%"
                        // padding: '1rem',
                    }}
                >
                    <span className={"text-red"}>chat1</span>
                    <span className={"text-blue"}>chat2</span>
                    <span className={"text-green"}>chat3</span>
                    <span className={"text-orange"}>chat4</span>
                    <span className={"text-purple"}>chat5</span>
                    <span className={"text-yellow"}>chat6</span>
                    <span className={"text-pink"}>chat7</span>
                    <span className={"text-navy"}>chat8</span>
                </Stack>
                {/* 입력창 */}
                <Form className={"mx-4 mb-4"}>
                    <Form.Control type="text" placeholder="채팅을 입력하세요..." className="w-100" />
                </Form>
            </Stack>
        </div>
    );
}

export default Sidebar;