import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App () {
    return(
        <>
            <Navbar />
            <div className="main-container">
                <div>
                    <h3>Bem vindo</h3>
                </div>
                <Outlet />
            </div>
        </>
    )
}