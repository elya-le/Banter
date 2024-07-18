import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkFetchServers, thunkFetchServer, thunkJoinServer, thunkLeaveServer } from "../../redux/servers"; 
import { Navigate, Link, useParams } from "react-router-dom"; //<---^-------- join/leave sever update
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

  // const servers = useSelector((state) => state.servers.servers);
  // const server = useSelector((state) => state.servers.servers.find((s) => s.id === parseInt(id)));

  // -------- explain this part
  const allServers = useSelector((state) => state.servers.allServers) || []; // ensure default empty array 
  const joinedServers = useSelector((state) => state.servers.joinedServers) || []; // ensure default empty array 
  const viewedServers = useSelector((state) => state.servers.viewedServers) || []; // ensure default empty array 
  // const notJoinedServers = useSelector((state) => state.servers.notJoinedServers); 
  const server = allServers.find((s) => s.id === parseInt(id)); // find the server by id from allServers 
  const channels = useSelector((state) => state.channels.channels) || []; // ensure default empty array 

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

  const handleJoinServer = () => { // <-------- join sever update
    dispatch(thunkJoinServer(id)); 
  };

  const handleLeaveServer = () => {  // <-------- leave sever update
    dispatch(thunkLeaveServer(id));
  };


  if (!user) {
    return <Navigate to="/" />;
  }

  if (!server) {
    return <div>Loading...</div>;
  }

  const isMember = joinedServers.includes(server.id); // <-------- join sever update

  return (
    <div className="server-details-page">
        {/* --------------- sidebar ----------------- */}
        <div className="sidebar">
          <nav className="sidebar-nav">
              {/* --------------- v1  ----------------- */}
              {/* {servers.map((server) => (
                <li key={server.id} className="server-icon">
                  <Link to={`/servers/${server.id}`}>
                    <div className="icon-circle">
                      {server.avatar_url ? (
                        <img src={server.avatar_url} alt={`${server.name} avatar`} className="server-avatar" />
                      ) : (
                        server.name[0].toUpperCase()  // display the first letter of the server name
                      )}
                    </div>
                  </Link>
                </li>
              ))} */}
              {/* --------------- v2 only showing joined ----------------- */}
              {/* {joinedServers.map((serverId) => {
              const server = allServers.find((s) => s.id === serverId);
                return (
                  <li key={server.id} className="server-icon">
                    <Link to={`/servers/${server.id}`}>
                      <div className="icon-circle">
                        {server.avatar_url ? (
                          <img src={server.avatar_url} alt={`${server.name} avatar`} className="server-avatar" />
                        ) : (
                          server.name[0].toUpperCase()
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })} */}
              <ul>
                {/* --------------- Viewed Servers ----------------- */}
                {viewedServers.map((server) => (
                  <li key={server.id} className="server-icon">
                    <Link to={`/servers/${server.id}`}>
                      <div className="icon-circle">
                        {server.avatar_url ? (
                          <img src={server.avatar_url} alt={`${server.name} avatar`} className="server-avatar" />
                        ) : (
                          server.name[0].toUpperCase()
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
              {/* --------------- Joined Servers ----------------- */}
              {joinedServers.map((serverId) => {
                const server = allServers.find((s) => s.id === serverId);
                return (
                  <li key={server.id} className="server-icon">
                    <Link to={`/servers/${server.id}`}>
                      <div className="icon-circle">
                        {server.avatar_url ? (
                          <img src={server.avatar_url} alt={`${server.name} avatar`} className="server-avatar" />
                        ) : (
                          server.name[0].toUpperCase()
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
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
        {/* --------------- nav and messages ----------------- */}
        <div className="banner-channel-nav-and-messages-container">
          {/* ----------- join server banner */}
          {!isMember && (
            <div className="join-server-banner">
              <p>You are currently in preview mode. Join this server to start chatting!</p>
              <button onClick={handleJoinServer}>Join this server</button>
            </div>
          )}
          <div className="channel-nav-and-messages-container">
            {/* --------------- side nav ----------------- */}
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
            <div className="server-name-container no-banner" onClick={toggleDropdown}>
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
               {/* --------------- edit sever link ----------------- */}
              <li>
                <Link to={`/servers/${id}/edit`} className="server-dd-hover">Edit Server</Link>
              </li>
              {/* --------------- create sever modal ----------------- */}
              <li className="server-dd-hover create-channel-item">
                <OpenModalButton
                  modalComponent={<ChannelFormModal serverId={id} />}
                  buttonText="Create Channel"
                  className="create-channel-link"
                />
              </li>
              {/* --------------- leave sever modal ----------------- */}
              {isMember && (
                  <li className="server-dd-hover leave-server-item" onClick={handleLeaveServer}>
                    Leave Server
                  </li>
              )}
            </ul>
          )}
        <div className="channel-list-container">
          <div className="channel-header">
            <h5>Channels</h5>
            <div className="create-channel-tooltip-wrapper">
              <OpenModalButton
                modalComponent={<ChannelFormModal serverId={id} />}
                buttonText={<FaPlus />} 
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
            {/* --------------- main content ----------------- */}
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
                <p>This is your brand new, shiny server. </p>
                {/* Here are some steps to help you get started: */}
                {/* <ul>
                  <li>Add a channel to send your first message</li>
                  <li>Personalize your server with an icon & banner</li>
                  <li>Add a description</li>
                </ul> */}
              </div>
            </div>
          )}
            </div>
          </div>
        </div>
    </div>
  );
}

export default ServerDetailPage;
