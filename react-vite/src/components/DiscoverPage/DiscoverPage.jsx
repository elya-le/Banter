import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { thunkFetchServers } from "../../redux/servers";
import { thunkLogout } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton"; // Import the OpenModalButton
import ServerFormModal from "../Servers/ServerFormModal"; // Import the ServerFormModal
import "./DiscoverPage.css";
import { FaCompass } from "react-icons/fa6";

function DiscoverPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers.servers);

  useEffect(() => {
    if (user) {
      dispatch(thunkFetchServers());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="discover-page">
      <div className="sidebar">
        {/* sidebar content with icons of servers */}
        <nav className="sidebar-nav">
          <ul>
            {servers.map((server) => (
              <li key={server.id} className="server-icon">
                <Link to={`/servers/${server.id}`}>
                  <div className="icon-circle">
                    {server.name[0]}  {/* display the first letter of the server name */}
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <OpenModalButton
                modalComponent={<ServerFormModal />}
                buttonText="+"
                className="create-server-icon"
              />
            </li>
            <li>
              <Link to="/discover-page" className="discover-page-icon">
                {/* replace with discover icon */}
                <div className="discover-icon">
                  <FaCompass />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="side-nav">
        <div className="channel-nav">
          {/* channel nav content */}
        </div>
        <div className="profile-nav">
          <div className="profile-info">
            <span>{user.username}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="hero-section">
          <h1>Welcome {user.username}! Find your community on Discord</h1>
          <p>From gaming, to music, to learning, there&apos;s a place for you.</p>
        </div>
        <h1>Featured communities</h1>
        <div className="server-grid">
          {servers.map((server) => (
            <Link to={`/servers/${server.id}`} key={server.id} className="server-card-link">
              <div className="server-card">
                <img src={server.banner_url} alt={`${server.name} banner`} className="server-banner"/>
                <div className="server-info">
                  <img src={server.avatar_url} alt={`${server.name} avatar`} className="server-avatar"/>
                  <div>
                    <h2>{server.name}</h2>
                    <p>{server.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoverPage;
