import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Dashboard from '../components/MemberDashboard';
import WelcomePage from '../components/WelcomePage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
