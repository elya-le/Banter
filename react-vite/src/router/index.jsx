// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import DiscoverPage from '../components/DiscoverPage/DiscoverPage';
import WelcomePage from '../components/WelcomePage';
import ServerDetails from '../components/Servers/ServerDetails';
import EditServerForm from '../components/Servers/EditServerForm';
import EditChannelForm from '../components/Channels/EditChannelForm';
import Chat from '../components/Channels/Chat'; // <-- add this import

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
        path: "servers/:id",
        element: <ServerDetails />,
      },
      {
        path: "servers/:id/edit",
        element: <EditServerForm />,
      },
      {
        path: "channels/:id/edit",
        element: <EditChannelForm />,
      },
      {
        path: "chat",  // <-- Add this route for Chat
        element: <Chat />,
      },
    ],
  },
]);
