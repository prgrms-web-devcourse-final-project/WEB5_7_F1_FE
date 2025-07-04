import {Outlet} from "react-router-dom";
import {Button, Card, Image, Stack} from "react-bootstrap";
import mainLogoRect from "../../assets/images/main-logo-rect.png";
import styles from "./Layout.module.scss"

const Layout = () => {
  return (
    <>
        <Stack direction={"horizontal"} className="justify-content-center m-3">
            <Image src={mainLogoRect} width={"200px"} height={"50px"}/>
        </Stack>
        <Stack direction={"horizontal"} className={"justify-content-center"}>
            <div className={styles.borderCard}>
                <Stack direction={"horizontal"} className={"m-3"}>
                    <span style={{ color: "var(--Colors-Orange, #FF9500)" }}>빵야빵야님</span>
                    <Stack direction={"horizontal"} gap={5} className={"ms-auto"}>
                        <span>QUIZ</span>
                        <span>게임하기</span>
                        <span>마이페이지</span>
                        <Button style={{ height: "30px" }}>로그아웃</Button>
                    </Stack>
                </Stack>
            </div>
        </Stack>
        <Stack direction={"horizontal"} className={"justify-content-center mt-5"}>
            <div className={styles.borderCard}>
                <Outlet />
            </div>
        </Stack>
    </>
  );
};

export default Layout;
