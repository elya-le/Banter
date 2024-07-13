import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import "./TopNavigation.css";

function TopNavigation() {

  const user = useSelector(state => state.session.user);

  return (
    <nav className="top-navigation-bar">
      <NavLink to="/" className="home-link">Discord</NavLink>
      <div className="auth-buttons">
        {!user && <SignupButton className="signup-button" />}
        {user && <span className="welcome-message">Welcome, {user.username}!</span>}
        <LoginButton className="login-button" />
        
      </div>
    </nav>
  );
}

export default TopNavigation;