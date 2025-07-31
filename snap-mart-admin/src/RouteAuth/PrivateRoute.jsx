import { Navigate } from 'react-router-dom';
import useGetAuthDetails from '../Hooks/useGetAuthDetails';

const PrivateRoute = ({children}) => {
  const {user,loading} = useGetAuthDetails();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/auth" />;
}

export default PrivateRoute
