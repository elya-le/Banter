import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkLogout } from "../../redux/session";
import LoginFormModal from "../LoginFormModal";
import "./LoginButton.css";

function LoginButton({ className, children }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const user = useSelector((state) => state.session.user);

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />);
  };

  const logout = () => {
    dispatch(thunkLogout());
  };

  return (
    <button onClick={user ? logout : openLoginModal} className={className}>
      {children || (user ? "Log Out" : "Login")}
    </button>
  );
}

export default LoginButton;