import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
