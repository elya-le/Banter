import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
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
        <h1>Create an account</h1>
      </div>
      {/* {errors.server && <p>{errors.server}</p>} */}
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <span>
            Confirm Password
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
      </div>
        <button type="submit">Continue</button>
      </form>
    </div>
    </>
  );
}

export default SignupFormModal;
