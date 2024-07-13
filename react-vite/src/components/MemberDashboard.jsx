import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state) => state.session.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        {/* Sidebar content with icons of servers */}
        <nav className="server-nav">
          <ul>
            <p>Home</p>
            <p>Gaming</p>
            <p>Music</p>
            <p>Entertainment</p>
            <p>Science & Tech</p>
            <p>Education</p>
            <p>Student Hubs</p>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <h1>Welcome, {user.username}!</h1>
        <p>This is your dashboard.</p>
      </div>
    </div>
  );
}

export default Dashboard;