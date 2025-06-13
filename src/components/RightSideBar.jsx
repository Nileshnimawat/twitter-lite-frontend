import {
  useDispatch,
  useSelector,
  useNavigate,
  logo,
  useState,
  useSearch,
  useEffect
} from "../utility/libs";

import { handleFollowAndUnfollow } from "../utility/handleFollowAndUnfollow";

const RightSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.users.otherUsers);
   const loggedInUser = useSelector((state) => state.users.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5); // default 5 users


  if (!data) return <div>No users found</div>;

  const filteredUsers = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="hidden lg:block w-[31%] p-4 pl-7 text-white flex flex-col items-center bg-[#16181C]">
      <div className="w-full max-w-xs flex flex-col gap-4">
        {/* Search Bar */}
        <div className="bg-black border-gray-700 border-2 rounded-full px-4 py-2 flex items-center">
          <svg
            className="w-6 h-6 text-gray-400 mr-3"
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
            className="bg-transparent outline-none text-sm placeholder:text-gray-400 text-white w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(5); // reset on new search
            }}
          />
        </div>

        {/* Who to Follow */}
        <div className="bg-black text-white p-4 rounded-xl w-full max-w-xs border-gray-700 border-2">
          <h2 className="text-lg font-bold mb-4">Who to follow</h2>
          {visibleUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between mb-5 transition-transform duration-200 transform hover:scale-105"
            >
              <div onClick={() => navigate(`/profile/${user._id}`)}
              className="flex items-center gap-3">
                <img
                  src={user.image || logo}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col cursor-pointer">
                  <span className="font-semibold flex items-center gap-1">
                    {user.name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    @{user.username}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  handleFollowAndUnfollow(loggedInUser, user._id, dispatch)
                }
                className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold"
              >
                {loggedInUser?.following?.includes(user._id)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          ))}

          {visibleCount < filteredUsers.length && (
            <p
              className="text-blue-400 text-sm cursor-pointer hover:underline"
              onClick={handleShowMore}
            >
              Show more
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
