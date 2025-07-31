import { Navigate } from "react-router-dom";

import useGetAuthDetails from "../Hooks/useGetAuthDetails";

const PublicRoute = ({ children }) => {
  const {user,loading} = useGetAuthDetails();
  if (loading) return <p>Loading...</p>;

  return !user ? children : <Navigate to="/" />;
};

export default PublicRoute;
