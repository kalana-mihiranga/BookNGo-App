import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children, requiredRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      // Simple JWT payload extraction (without jwt-decode)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/signin');
        return;
      }

      if (requiredRole && userRole !== requiredRole) {
        navigate('/unauthorized');
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      navigate('/signin');
    }
  }, [navigate, requiredRole]);

  return children;
};

export default AuthGuard;