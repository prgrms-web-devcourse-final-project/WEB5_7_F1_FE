import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";

const GameLayout = () => {
    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex flex-grow-1">
                <Sidebar />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default GameLayout;