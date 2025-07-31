import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const PublicRoute = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const { authVerify } = useAuth();

  useEffect(() => {
    authVerify()
      .then((res) => {
        setIsAuthenticated(res);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated?<Navigate to={"/"}/>:children;
}

export default PublicRoute;
