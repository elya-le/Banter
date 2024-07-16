import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link, useParams } from "react-router-dom";
import { thunkFetchServers, thunkFetchServer } from "../../redux/servers";
import { thunkFetchChannels } from "../../redux/channels";
import { thunkLogout } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton"; 
import ServerFormModal from "../Servers/ServerFormModal"; 
import ChannelFormModal from "../Channels/ChannelFormModal"; 
import "../DiscoverPage/DiscoverPage.css";
import "./ServerDetails.css";
import { FaCompass, FaChevronDown, FaTimes, FaPlus, FaHashtag, FaCog } from "react-icons/fa";

function ServerDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams(); // get the server ID from the URL parameters
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers.servers);
  const server = useSelector((state) => state.servers.servers.find((s) => s.id === parseInt(id)));
  const channels = useSelector((state) => state.channels.channels); 

  // modal state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // fetch servers and server details when user/id changes
  useEffect(() => {
    if (user) {
      dispatch(thunkFetchServers());
      dispatch(thunkFetchServer(id));
      dispatch(thunkFetchChannels(id));
    }
  }, [dispatch, user, id]);

  // event listener for closing dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.server-name-container') && !event.target.closest('.server-dropdown-menu')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    toggleDropdown();
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <div className="server-details-page">
        <div className="sidebar">
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
                  <div className="discover-icon">
                    <FaCompass />
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="side-nav">
          {server.banner_url ? (
            <div className="server-banner" onClick={toggleDropdown}>
              <img src={server.banner_url} alt={`${server.name} banner`} />
              <div className="server-name-container" onClick={toggleDropdown}>
                <h1 className="server-name-side-nav">{server.name}</h1>
                {dropdownOpen ? (
                  <FaTimes className="dropdown-icon" onClick={handleIconClick} />
                ) : (
                  <FaChevronDown className="dropdown-icon" onClick={handleIconClick} />
                )}
              </div>
            </div>
          ) : (
            <div className="server-name-container" onClick={toggleDropdown}>
              <h1 className="server-name-side-nav">{server.name}</h1>
              {dropdownOpen ? (
                <FaTimes className="dropdown-icon" onClick={handleIconClick} />
              ) : (
                <FaChevronDown className="dropdown-icon" onClick={handleIconClick} />
              )}
            </div>
          )}
          {dropdownOpen && (
            <ul className="server-dropdown-menu">
              <li>
                <Link to={`/servers/${id}/edit`} className="server-dd-hover">Edit Server</Link>
              </li>
              <li>
                <Link to="/members" className="server-dd-hover">Create Channel</Link>
              </li>
            </ul>
          )}
        <div className="channel-list-container">
          <div className="channel-header">
            <h5>Channels</h5>
            <div className="create-channel-tooltip-wrapper">
              <OpenModalButton
                modalComponent={<ChannelFormModal serverId={id} />}
                buttonText={<FaPlus />} // Use the FaPlus icon
                className="create-channel-icon"
              />
              <div className="tooltip">Create Channel</div>
            </div>
          </div>
          <div className="channel-list">
            <ul>
              {channels && channels.length > 0 ? (
                channels.map((channel) => (
                  <li key={channel.id}>
                    <div className="channel-list-item">
                      <FaHashtag className="channel-icon" />
                      <div className="channel-name">
                        {channel.name.toLowerCase()}
                      </div>
                      <Link to={`/channels/${channel.id}/edit`} className="settings-icon">
                        <FaCog />
                        <div className="tooltip">Edit Channel</div>
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <p>No channels</p>
              )}
            </ul>
          </div>
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
          {server.channels && server.channels.length > 0 ? (
            <div className="chat">
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
    </div>
  );
}

export default ServerDetailPage;
