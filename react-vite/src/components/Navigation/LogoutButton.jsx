import { useDispatch } from "react-redux";
import { thunkLogout } from "../redux/session";

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Log Out
    </button>
  );
}

export default LogoutButton;