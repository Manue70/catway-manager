
import { Navigate } from "react-router-dom";

function PrivateRoute({ token, userRole, requiredRole, children }) {
 
  if (!token || userRole !== requiredRole) {
    return <Navigate to="/" replace />; 
  }
  return children; 
}

export default PrivateRoute;

