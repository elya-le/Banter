import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import "./Navigation.css";

function Navigation() {

  const user = useSelector(state => state.session.user);

  return (
    <nav className="navigation-bar">
      <NavLink to="/" className="home-link">Discord</NavLink>
      <div className="auth-buttons">
        {!user && <SignupButton className="signup-button" />}
        {user && <span className="welcome-message">Welcome, {user.username}!</span>}
        <LoginButton className="login-button" />
        
      </div>
    </nav>
  );
}

export default Navigation;