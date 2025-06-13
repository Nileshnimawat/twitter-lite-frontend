import { handleFollowAndUnfollow } from "../utility/handleFollowAndUnfollow";
import { 
  useParams, 
  useLocation, 
  useNavigate, 
  useSelector,
  useDispatch } from "../utility/libs";

const FollowTabs = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state)=>state.users.user);
  const dispatch = useDispatch();

  const activeTab = location.pathname.includes("followers") ? "followers" : "following";

  const allUsers = useSelector((state) => {
    const others = state.users.otherUsers || [];
    const current = state.users.user;
    return [...others, current].filter(Boolean);
  });

  const profileUser = allUsers.find((u) => u._id === id);
  if (!profileUser) return <div className="text-white p-4">User not found</div>;

  const userIds = profileUser[activeTab] || [];
  const displayedUsers = allUsers.filter((u) => userIds.includes(u._id));

  return (
    <div className="bg-black text-white p-4 w-[47%] mx-auto border-gray-700  h-screen overflow-y-auto hide-scrollbar">
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => navigate(`/${id}/followers`)}
          className={`px-4 py-2 ${
            activeTab === "followers"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => navigate(`/${id}/followings`)}
          className={`px-4 py-2 ${
            activeTab === "following"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400"
          }`}
        >
          Following
        </button>
      </div>

      {displayedUsers.length === 0 ? (
        <p className="text-gray-400">No {activeTab} yet.</p>
      ) : (
        displayedUsers.map((user) => (
          <div 
            onClick={()=>navigate(`/profile/${user._id}`)}
            key={user._id}
            className="flex items-center gap-4 py-4 border-b border-gray-800 hover:scale-102"
          >
            <img
              src={user.image || "/default.jpg"}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold flex items-center gap-1">
                {user.name}{" "}
                {user.verified && <span className="text-blue-500">✔️</span>}
              </h2>
              <p className="text-gray-400 text-sm">@{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FollowTabs;

