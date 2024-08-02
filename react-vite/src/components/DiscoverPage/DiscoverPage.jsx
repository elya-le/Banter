import { useEffect, useState } from "react";
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
  const allServers = useSelector((state) => state.servers.allServers) || [];
  const joinedServers = useSelector((state) => state.servers.joinedServers) || [];
  const viewedServers = useSelector((state) => state.servers.viewedServers) || [];
  
  const [selectedCategory, setSelectedCategory] = useState("Home");

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

  const categories = ["Home", "Gaming", "Music", "Education", "Art" ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredServers = selectedCategory === "Home" 
    ? allServers.filter(server => !joinedServers.includes(server.id))
    : allServers.filter(server => !joinedServers.includes(server.id) && server.category === selectedCategory);

  const notJoinedServers = filteredServers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="discover-page">
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul>
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
                          server.name[0].toUpperCase()
                        )}
                      </div>
                    </Link>
                  </li>
                )
              );
            })}
            <li className="divider"></li> {/* add the divider here */}
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
      <div className="middle-bar-nav">
        <h2 className="discover-header">Discover</h2> {/* Add the Discover header */}
        <div className="category-nav">
          {categories.map((category) => (
            <Link
              key={category}
              to="#"
              className={`category-link ${selectedCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Link>
          ))}
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
        <div className="featured-header">
          <h1>Featured communities</h1>
        </div>
        <div className="server-grid">
          {notJoinedServers.map((server) => (
            <Link to={`/servers/${server.id}`} key={server.id} className="server-card-link">
              <div className="server-card">
                {server.banner_url ? (
                  <img src={server.banner_url} alt={`${server.name} banner`} className="server-banner"/>
                ) : (
                  <div className="server-banner-placeholder"></div>
                )}
                <div className="server-info">
                  {server.avatar_url ? (
                    <img src={server.avatar_url} alt={`${server.name} avatar`} className="server-avatar"/>
                  ) : (
                    <div className="server-avatar-placeholder">{server.name[0].toUpperCase()}</div>
                  )}
                  <div>
                    <h2 className="server-name">{server.name}</h2>
                    <p className="server-description">{server.description}</p>
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
