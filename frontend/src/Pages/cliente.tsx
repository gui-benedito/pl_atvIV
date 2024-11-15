import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Cliente () {
    return(
        <>
            <Navbar />
            <div className="main-container">
                <Outlet />
            </div>
        </>
    )
}