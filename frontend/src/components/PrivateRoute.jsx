import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
