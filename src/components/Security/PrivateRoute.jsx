
import { useSelector, Navigate } from "../../utility/libs";


const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.users.user);
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
