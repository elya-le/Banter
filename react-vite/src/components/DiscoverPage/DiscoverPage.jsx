import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { thunkFetchServers } from "../../redux/servers";
import { thunkLogout } from "../../redux/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton"; 
import ServerFormModal from "../Servers/ServerFormModal"; 
import "./DiscoverPage.css";
import { FaCompass } from "react-icons/fa6";

function DiscoverPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const servers = useSelector((state) => state.servers.servers);
  const allServers = useSelector((state) => state.servers.allServers) || []; // updated ensure default empty array
  const joinedServers = useSelector((state) => state.servers.joinedServers) || []; // updated ensure default empty array
  const viewedServers = useSelector((state) => state.servers.viewedServers) || []; // updated ensure default empty array

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

  // filter out the servers the user has not joined
  const notJoinedServers = allServers.filter(server => !joinedServers.includes(server.id)); 


  return (
    <div className="discover-page">
      <div className="sidebar">
        {/* sidebar content with icons of servers */}
        <nav className="sidebar-nav">
          <ul>

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

             {/* --------- viewed servers -------- */}
            {viewedServers.map((server) => (
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
            ))}
          </ul>
          <ul>
            {/* ----------joined servers ------------ */}
            {joinedServers.map((serverId) => {
              const server = allServers.find((s) => s.id === serverId);
              return (
                server && (
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
                )
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
        <div className="category-nav">
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
          {notJoinedServers.map((server) => ( // <-------------------------- map over not joined servers
            <Link to={`/servers/${server.id}`} key={server.id} className="server-card-link">
            <div className="server-card">
              {server.banner_url ? (
                <img src={server.banner_url} alt={`${server.name} banner`} className="server-banner"/> // <----conditionally render the banner
              ) : (
                <div className="server-banner-placeholder"></div> // <---- blank div with background if no banner
              )}
              <div className="server-info">
                {server.avatar_url ? (
                  <img src={server.avatar_url} alt={`${server.name} avatar`} className="server-avatar"/> // <---- conditionally render the avatar
                ) : (
                  <div className="server-avatar-placeholder">{server.name[0].toUpperCase()}</div> // <---- display first letter of server name if no avatar
                )}
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
