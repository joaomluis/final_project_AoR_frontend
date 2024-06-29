import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "./stores/useUserStore";

function PrivateRoute({ children }) {
  const token = useUserStore((state) => state.token);
  const location = useLocation();
  return token ? children : <Navigate to="/" replace state={{ from: location }} />;
}

export default PrivateRoute;
