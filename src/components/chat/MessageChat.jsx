import { addMessage } from "../../store/users/messageSlice";
import { SEND_MESSAGE } from "../../utility/constants";
import {
  logo,
  useSelector,
  useState,
  axios,
  useDispatch,
  useGetRealTimeMessage,
} from "../../utility/libs";

import { useRef, useEffect } from "react";

const MessageChat = () => {
  useGetRealTimeMessage();

  const user = useSelector((state) => state.users.selectedUser);
  const onlineUsers = useSelector((state) => state.users.onlineUsers);
  const messages = useSelector((state) => state.message.messages);
  const loggedInUser = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [sendMessage, setSendMessage] = useState("");

  const isOnline = onlineUsers.includes(user._id);


  const scrollRef = useRef(null);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onHandleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${SEND_MESSAGE}/${id}`,
        { message: sendMessage },
        {
          withCredentials: true,
        }
      );
      dispatch(addMessage(res.data.newMessage));
    } catch (err) {
      console.log(err);
    }
    setSendMessage("");
  };

  return (
    <div className="w-[90%] lg:w-[65%] flex flex-col h-full border-2 border-gray-700">
      {/* Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center gap-4">
          <img
            src={user.profileImage || logo}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-sm text-gray-400">@{user.username}</p>
            <p className="text-sm text-green-800">
              {isOnline ? "online" : "offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 hide-scrollbar">
        {messages?.map((msg) => (
          <div
            key={msg?._id}
            className={`px-4 py-2 rounded-4xl break-words w-fit max-w-[50%] ${
              msg.senderId === loggedInUser._id
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-800 text-white"
            }`}
          >
            <p className="px-1 font-light">{msg?.message}</p>
            <div className="text-xs mt-1 text-right text-gray-300">
              {msg?.time} {msg?.seen ? "• Seen" : ""}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => onHandleSubmit(e, user._id)}
        className="border-t border-gray-700 p-4 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Start a new message"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          className="flex-1 bg-black text-white px-4 py-2 border border-gray-700 rounded-full focus:outline-none"
        />
        <button type="submit" className="text-blue-500 font-semibold">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageChat;
