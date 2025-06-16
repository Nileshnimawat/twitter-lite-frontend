import Loader from "./components/layout/Loader"; // import the loader
import { useSelector,useGetLoggedInUser,useGetAllUsers,useDispatch
  ,useEffect, Toaster,useNavigate
 } from "./utility/libs"; 
import AppRoutes from "./routes/AppRoutes";
import io from "socket.io-client"

import { setSocket } from "./store/users/socketSlice";
import { setOnlineUsers } from "./store/users/userSlice";



const App = () => {
  useGetLoggedInUser();
  useGetAllUsers();

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.user);
  const socket = useSelector((state) => state.socket.socket);
   const loading = useSelector((state) => state.loading.isLoading);

     const navigate = useNavigate();

  useEffect(() => {
   if(!loggedInUser){
    navigate("/login");
   }
  }, [])

  useEffect(() => {
    if (loggedInUser) {
      const socketInstance = io(import.meta.env.VITE_SOCKET_BACKEND_URL, {
         transports: ["websocket"],
        query: { userId: loggedInUser._id },
        
      });

      dispatch(setSocket(socketInstance));

      socketInstance.on("online-users", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketInstance.disconnect();
        dispatch(setSocket(null));
      };
    } else {
      if (socket) {
        socket.disconnect();
        dispatch(setSocket(null));
      }
    }
  }, [loggedInUser]);

  return (
    <>
        {loading && <Loader fullScreen />}
      <AppRoutes />
      <Toaster />
      
    </>
  );
};

export default App;
