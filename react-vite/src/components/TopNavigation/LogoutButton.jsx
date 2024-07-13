import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../redux/session";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(thunkLogout());
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Log Out
    </button>
  );
}

export default LogoutButton;