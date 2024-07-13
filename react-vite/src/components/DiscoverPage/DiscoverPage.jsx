import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { thunkFetchServers } from "../../redux/servers";
import { thunkLogout } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton"; // import the button
import ServerFormModal from "../Servers/ServerFormModal"; // Ensure you import the correct component
import "./DiscoverPage.css";
import { FaCompass } from "react-icons/fa6";




function DiscoverPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers.servers);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(thunkFetchServers());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                modalComponent={<ServerFormModal onClose={handleCloseModal} />}
                buttonText="+"
                onButtonClick={handleOpenModal}
                className="add-server-icon"
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
      <div className="middle-bar-nav">
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
          <h1>Find your community on Discord</h1>
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
      {isModalOpen && <ServerFormModal onClose={handleCloseModal} />}
    </div>
  );
}

export default DiscoverPage;
