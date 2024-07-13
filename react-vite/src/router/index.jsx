import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import DiscoverPage from '../components/DiscoverPage/DiscoverPage';
import WelcomePage from '../components/WelcomePage';
import ServerDetails from '../components/Servers/ServerDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "discover-page",
        element: <DiscoverPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "servers/:id",
        element: <ServerDetails />, // Update to match the correct file structure
      },
    ],
  },
]);
