import {Outlet, useLocation, NavLink, useNavigate} from "react-router-dom";
import {Button, Image, Nav, Stack} from "react-bootstrap";
import mainLogoRect from "../../assets/images/main-logo-rect.png";
import styles from "./Layout.module.scss"

const Layout = () => {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const isActive = (target) => path.startsWith(target); // 또는 path === target
    return (
    <>
        <Stack direction={"horizontal"} className="justify-content-center m-3">
            <Image src={mainLogoRect} width={"300px"} height={"150px"}/>
        </Stack>
        <Stack direction={"horizontal"} className={"justify-content-center"}>
            <div className={`${styles.borderCard} `}>
                <Stack direction={"horizontal"} className={"m-3 justify-content-between"}>
                    <span className={"bg-light"} style={{ color: "var(--Colors-Orange, #FF9500)" }}>빵야빵야님</span>
                    <Nav>
                        <Stack direction={"horizontal"} gap={5}>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/quiz" className={isActive('/quiz') ? 'text-success fw-bold' : ''}>QUIZ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/room" className={isActive('/room') ? 'text-success fw-bold' : ''}>게임하기</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/rank" className={isActive('/rank') ? 'text-success fw-bold' : ''}>전체 랭킹</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/mypage" className={isActive('/mypage') ? 'text-success fw-bold' : ''}>마이페이지</Nav.Link>
                            </Nav.Item>
                            <Button style={{ height: "30px" }}
                                onClick={() => {
                                    // 로그아웃 로직 추가
                                    navigate('/login');
                                }}
                            >
                                로그아웃
                            </Button>
                        </Stack>
                    </Nav>
                </Stack>
            </div>
        </Stack>
        <Stack direction={"horizontal"} className={"justify-content-center my-5"}>
            <div className={styles.borderCard}>
                <Outlet />
            </div>
        </Stack>
    </>
    );
};

export default Layout;
