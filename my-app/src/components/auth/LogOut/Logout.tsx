import { useNavigate } from "react-router-dom";
import "./Logout.css";

function LogOut() {
    const navigate = useNavigate();
 

    function handleLogout() {

        window.open('/login', "_self");
        localStorage.clear();

    }

    return (
        <button
            onClickCapture={handleLogout}
            className="logoutButton">
            Logout
        </button>
    );
}

export default LogOut;