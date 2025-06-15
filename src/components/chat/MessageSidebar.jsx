import {
  logo,
  useDispatch,
  useLocation,
  useSelector,
  useState,
} from "../../utility/libs";
import { setSelectedUser } from "../../store/users/userSlice";

const MessageSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname === "/messages";

  const isSelected = useSelector((state) => state.users.selectedUser);
  const onlineUsers = useSelector((state) => state.users.onlineUsers);
  const data = useSelector((state) => state.users.otherUsers);

  const [searchQuery, setSearchQuery] = useState("");

  if (!data) return <div>No users found</div>;

  const filteredUsers = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
  };

  const checkIsOnline = (userId) => onlineUsers.includes(userId);

  return (
    <div className="w-[35%] border-r border-gray-700 h-full overflow-y-auto hide-scrollbar">
      <h2 className="text-xl font-bold p-4">Messages</h2>

      {/* Search Bar */}
      <div
        className={`bg-black border-gray-700 border-2 rounded-full px-4 py-2 my-3 flex items-center m-1 gap-2 ${
          path ? "lg:w-85" : " w-full"
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm placeholder:text-gray-400 text-white w-full"
        />
      </div>

      {/* Chat User List */}
      {filteredUsers.map((chat) => {
        const isOnline = checkIsOnline(chat._id);

        return (
          <div
            key={chat._id}
            onClick={() => handleClick(chat)}
            className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-900 ${
              isSelected?._id === chat._id ? "bg-[#1b1d1e]" : ""
            }`}
          >
           
            <div className="relative">
              <img
                src={chat.profileImage || logo}
                alt={chat.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {/* Online Indicator Dot */}
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border border-black ${
                  isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>

            {/* Name and Last Message */}
            <div className="hidden lg:flex flex-col">
              <span className="font-semibold">{chat.name}</span>
              <p className="text-sm text-green-800">
              </p>
              <span className="text-sm text-gray-400">
                {chat?.lastMessage || " "}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSidebar;
