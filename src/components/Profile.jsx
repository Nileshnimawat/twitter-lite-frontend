import { 
  useDispatch, 
  useSelector, 
  useParams, 
  useNavigate, 
  TweetCard, 
  useGetIndividualTweets,
  logo, 
  NavLink} from "../utility/libs";

import { handleFollowAndUnfollow } from "../utility/handleFollowAndUnfollow";

const Profile = () => {
  const { id } = useParams();
  useGetIndividualTweets(id); 
  const tweets = useSelector((state) => state.tweets.individualTweets);

  const navigate = useNavigate();
  const users = useSelector((state) => state.users.otherUsers);
  const loggedInUser = useSelector((state) => state.users.user); 
  const allUsers = [...users, loggedInUser].filter(Boolean);
  const user = allUsers.find((u) => u._id === id);

  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="w-[50%] text-white bg-black min-h-screen font-sans flex items-center justify-center">
        <div>User not found</div>
      </div>
    );
  }

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="w-full lg:w-[47%] text-white bg-black min-h-screen font-sans lg:border-2 lg:border-gray-700 h-screen overflow-y-auto hide-scrollbar">
      <div className="p-3">
        <button className="hover:underline" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="h-45 bg-gray-800"></div>
      <div className="p-4">
        <div className="flex justify-between items-center -mt-16">
          <img
            src={user.image || logo}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-black"
          />
          {loggedInUser._id === user._id ? (
            <NavLink to={"/editprofile"} className="border border-gray-500 px-4 py-1 rounded-full hover:bg-white hover:text-black text-sm">
              Edit profile
            </NavLink>
          ) : (
            <button
              onClick={() => handleFollowAndUnfollow(loggedInUser, id, dispatch)}
              className="border border-gray-500 px-4 py-1 rounded-full hover:bg-white hover:text-black text-sm"
            >
              {loggedInUser?.following?.includes(user._id)
                ? "Following"
                : "Follow"}
            </button>
          )}
        </div>

        <div className="mt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <button className="bg-[#16181C] px-2 py-0.5 text-sm border border-gray-600 rounded-full flex items-center gap-1">
              <span className="text-blue-400">✔️</span>
              <span>Get verified</span>
            </button>
          </div>
          <p className="text-gray-500">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-white text-sm mt-2 mb-2 whitespace-pre-wrap">
            {user.bio}
          </p>
        )}

        {/* Joined info */}
        <div className="text-sm text-gray-500 mt-1">
          <span>📅 Joined {joinDate}</span>
        </div>

        {/* Following/Followers */}
        <div className="mt-2 text-sm text-gray-400 flex gap-4">
          <button onClick={() => navigate(`/${user._id}/followings`)}>
            <span className="text-white font-semibold">
              {user.following?.length || 0}
            </span>{" "}
            Followings
          </button>
          <button onClick={() => navigate(`/${user._id}/followers`)}>
            <span className="text-white font-semibold">
              {user.followers?.length || 0}
            </span>{" "}
            Followers
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-4 border-b border-gray-700 pb-2 text-gray-400 text-sm">
          <span className="text-blue-400 border-b-2 border-blue-400 pb-1">
            Posts
          </span>
        </div>

        <TweetCard tweets={tweets} />
      </div>
    </div>
  );
};

export default Profile;
