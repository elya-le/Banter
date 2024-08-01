import { useState, useEffect, useRef } from "react";
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
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });  // - log login attempt

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      console.log("Login errors:", serverResponse);  // - log login errors
      setErrors(serverResponse);
    } else {
      console.log("Login successful");  // - log successful login
      closeModal();
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@aa.io"; 
    const demoPassword = "password"; 
    console.log("Logging in with demo credentials");  // - log demo login attempt


    const serverResponse = await dispatch(
      thunkLogin({
        email: demoEmail,
        password: demoPassword,
      })
    );

    if (serverResponse) {
      console.log("Demo login errors:", serverResponse);  // - log demo login errors
      setErrors(serverResponse);
    } else {
      console.log("Demo login successful");  // - log successful demo login
      closeModal();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  return (
    <>
      <div className="modal-overlay">
        <div className="login-sign-up-container" ref={modalRef}>
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
            <button type="submit" className="log-in-submit">Log In</button>
            <button type="button" onClick={handleDemoLogin} className="demo-button">Log In as Demo User</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
