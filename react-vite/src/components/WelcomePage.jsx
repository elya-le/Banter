import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginButton from "../components/TopNavigation/LoginButton";
import "../index.css";

function HomePage() {
  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Navigate to="/discover-page" />;
  }

  return (
    <div className="home-page">
      <LoginButton className="home-page-button">Open Discord in your browser</LoginButton>
    </div>
  );
}

export default HomePage;
