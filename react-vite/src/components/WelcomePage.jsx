import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../index.css";

function HomePage() {
  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Navigate to="/discover-page" />;
  }

  return (
    <div className="home-page">
      <h1>Welcome to our app — </h1>
      <p>Please login to use Discord in your browser</p>
    </div>
  );
}

export default HomePage;
