import { useDispatch, useEffect, useSelector } from '../utility/libs'
import { addMessage } from '../store/users/messageSlice';

export const useGetRealTimeMessage = () => {
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage)); // cleaner and safer than setMessages([...])
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage); // cleanup to avoid multiple listeners
    };
  }, [socket, dispatch]);
};
