import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AppLayout from '../ui/AppLayout';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import Bookings from '../pages/Bookings';
import Cabins from '../pages/Cabins';
import NewUsers from '../pages/Users';
import Settings from '../pages/Settings';
import Account from '../pages/Account';

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'booking',
        element: <Bookings />,
      },
      {
        path: 'cabins',
        element: <Cabins />,
      },
      {
        path: 'users',
        element: <NewUsers />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

export { routes };
