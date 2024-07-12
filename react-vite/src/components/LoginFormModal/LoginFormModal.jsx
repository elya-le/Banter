import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@aa.io"; 
    const demoPassword = "password"; 

    const serverResponse = await dispatch(
      thunkLogin({
        email: demoEmail,
        password: demoPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
    <div className="login-sign-up-container">
      <div className="login-sign-up-header">
        <h1>Welcome back!</h1>
        <p>We are so excited to see you again!</p>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="email-password-input">
        <div className="input-group">
          <label>
            <span>
              EMAIL
              {errors.email && <p className="error">{errors.email}</p>}
            </span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </label>
          <label>
            <span>
              PASSWORD
              {errors.password && <p className="error">{errors.password}</p>}
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        </div>
        <button type="submit">Log In</button>
        <button type="button" onClick={handleDemoLogin} className="demo-button">Log In as Demo User</button>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
