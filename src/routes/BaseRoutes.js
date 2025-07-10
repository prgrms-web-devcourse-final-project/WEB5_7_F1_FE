import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/login/Login";
import Error404 from "../pages/error/Error404";
import Signup from "../pages/login/Signup";
import Layout from "../layout/main/Layout";
import RoomList from "../pages/room/RoomList";
import QuizList from "../pages/quiz/QuizList";
import CreateQuiz from "../pages/quiz/CreateQuiz";
import GameLayout from "../layout/game/GameLayout";
import GamePlay from "../pages/game/GamePlay";
import Rank from "../pages/rank/Rank";
import MyPage from "../pages/mypage/MyPage";
import HostPage from "../pages/game/HostPage";
import ParticipantPage from "../pages/game/ParticipantPage";

const BaseRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="/login" replace />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="/room" element={<Layout />}>
                <Route index element={<RoomList />} />
            </Route>
            <Route path="/room/:id" element={<GameLayout />}>
                <Route index element={<HostPage />} />
                <Route path={"participant"} element={<ParticipantPage />} />
                <Route path={"play"} element={<GamePlay />} />
            </Route>
            <Route path="/quiz" element={<Layout />}>
                <Route index element={<QuizList />} />
                <Route path={"create"} element={<CreateQuiz />} />
                <Route path={":id/edit"} element={<CreateQuiz />} />
            </Route>
            <Route path="/rank" element={<Layout />}>
                <Route index element={<Rank />} />
            </Route>
            <Route path="/mypage" element={<Layout />}>
                <Route index element={<MyPage />} />
            </Route>
            {/* 에러페이지 */}
            <Route path={"*"} element={<Error404 />} />
        </Routes>
    );
}

export default BaseRoutes;