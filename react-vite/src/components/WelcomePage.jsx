
import { useOutletContext } from "react-router-dom";

function WelcomePage() {
  const { sessionUser } = useOutletContext();

  return (
    <div className="home-page">
      <h1>
        {/* {sessionUser ? `Welcome, ${sessionUser.username}, Find your community on Discord` : 'Welcome! Open Discord in your browser'} */}
        {sessionUser ? `Find your community on Discord` : 'Welcome! Open Discord in your browser'}
      </h1>
    </div>
  );
}

export default WelcomePage;