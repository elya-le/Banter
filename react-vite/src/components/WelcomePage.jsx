
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function HomePage() {
  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="home-page">
      <h1>Welcome to our app — </h1>
      <p>Please login to use Discord in your browser</p>
    </div>
  );
}

export default HomePage;



// import { useOutletContext } from "react-router-dom";

// function WelcomePage() {
//   const { sessionUser } = useOutletContext();

//   return (
//     <div className="home-page">
//       <h1>
//         {/* {sessionUser ? `Welcome, ${sessionUser.username}, Find your community on Discord` : 'Welcome! Open Discord in your browser'} */}
//         {sessionUser ? `Find your community on Discord` : 'Welcome! Open Discord in your browser'}
//       </h1>
//     </div>
//   );
// }

// export default WelcomePage;