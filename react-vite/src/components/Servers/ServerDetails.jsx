import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link, useParams } from "react-router-dom";
import { thunkFetchServers, thunkFetchServer } from "../../redux/servers";
import { thunkLogout } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton"; // import the button
import ServerFormModal from "../Servers/ServerFormModal"; // ensure you import the correct component
import "../DiscoverPage/DiscoverPage.css";
import "./ServerDetails.css";
import { FaCompass } from "react-icons/fa";



function ServerDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams(); // get the server ID from the URL parameters
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers.servers);
  const server = useSelector((state) => state.servers.servers.find((s) => s.id === parseInt(id)));

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(thunkFetchServers());
      dispatch(thunkFetchServer(id));
    }
  }, [dispatch, user, id]);

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

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <div className="discover-page"> {/* reuse the same className for consistent styling */}
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
        {server.banner_url ? (
          <div className="server-banner">
            <img src={server.banner_url} alt={`${server.name} banner`} />
            <h1 className="server-name-middle-bar-nav">{server.name}</h1>
          </div>
        ) : (
          <h1 className="server-name-middle-bar-nav">{server.name}</h1>
        )}
        <div className="channel-nav">
          <p>Channels</p>
          {/* Render channels associated with the server */}
          {server.channels && server.channels.length > 0 ? (
            <ul>
              {server.channels.map((channel) => (
                <li key={channel.id}>{channel.name}</li>
              ))}
            </ul>
          ) : (
            <p>No channels</p>
          )}
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
      <div className="server-main-content">
        {/* Render real-time chat or server description based on the presence of channel chat content */}
        {server.channels && server.channels.length > 0 ? (
          <div className="chat">
            {/* Real-time chat component goes here */}
            <p>Real-time chat will be here...</p>
          </div>
        ) : (
          <div className="welcome-message">
            <div className="welcome-message-header">
              <h1>Welcome to {server.name}</h1>
            </div>
            <div className="server-action-items">
              <p>This is your brand new, shiny server. Here are some steps to help you get started:</p>
              <ul>
                <li>Add a channel to send your first message</li>
                <li>Personalize your server with an icon & banner</li>
                <li>Add a description</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && <ServerFormModal onClose={handleCloseModal} />}
    </div>
  );
}

export default ServerDetailPage;
