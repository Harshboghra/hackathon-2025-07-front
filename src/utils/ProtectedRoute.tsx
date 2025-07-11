import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../state/app.hooks';
import { authSelector } from '../state/auth/auth.reducer';

export const ProtectedRoute = () => {
  const authState = useAppSelector(authSelector);
  const location = useLocation();
  if (!authState.isLogin) {
    return <Navigate to="/login" replace />;
  }
  if (
    !authState.isCompanyHasUserIdSelected &&
    location.pathname !== '/select'
  ) {
    return <Navigate to="/select" replace />;
  }

  return <Outlet />;
};
