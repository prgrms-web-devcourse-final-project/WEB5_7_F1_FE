import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/login/Login";
import Error404 from "../pages/error/Error404";
import Signup from "../pages/login/Signup";
import Layout from "../layout/main/Layout";
import RoomList from "../pages/room/RoomList";

const BaseRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="/login" replace />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="/room" element={<Layout />}>
                <Route path={"list"} element={<RoomList />} />
            </Route>
            {/* 에러페이지 */}
            <Route path={"*"} element={<Error404 />} />
        </Routes>
    );
}

export default BaseRoutes;