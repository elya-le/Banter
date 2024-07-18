import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // added react-icons for eye icons
import { thunkLogin, thunkSignup } from "../../redux/session";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // state to toggle confirm password visibility
  const { closeModal } = useModal();
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match: ", password, confirmPassword);
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        confirm_password: confirmPassword // use confirm_password to match backend
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <h1>Create an account</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="email-password-input">
              <div className="input-group">
                <label>
                  <span>
                    Email
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
                    Username
                    {errors.username && <p className="error">{errors.username}</p>}
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>
                    Password
                    {errors.password && <p className="error">{errors.password}</p>}
                  </span>
                  <div className="password-container">
                    <input
                      type={showPassword ? "text" : "password"} // toggles between text and password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="password-toggle-button">
                      {showPassword ? <FaEyeSlash /> : <FaEye />} {/* icon changes based on state */}
                    </button>
                  </div>
                </label>
                <label>
                  <span>
                    Confirm Password
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                  </span>
                  <div className="password-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"} // toggles between text and password
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={toggleConfirmPasswordVisibility} className="password-toggle-button"> 
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* icon changes based on state */}
                    </button>
                  </div>
                </label>
              </div>
            </div>
            <button type="submit">Continue</button>
            <button type="button" onClick={handleDemoLogin} className="demo-button">Log In as Demo User</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormModal;
