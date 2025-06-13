import { 
  useSelector, 
  useLocation,
  TweetInput,
  TweetCard,
Outlet,
useNavigate} from "../../utility/libs";


const MainFeed = () => {
  const location = useLocation();
  const loggedInUser = useSelector((state) => state.users.user);
  const tweets = useSelector((state) => state.tweets.userTweets);
  const navigate = useNavigate();

  if(!loggedInUser) {
    navigate("/");
  }

  const likedTweets = loggedInUser?.liked || [];
  const liked = tweets?.filter((tweet) => likedTweets.includes(tweet._id)) || [];

  const following = tweets?.filter((tweet) =>
    loggedInUser?.following?.includes(tweet.userId?._id || tweet.userId)
  );

  const followers = tweets?.filter((tweet) =>
    loggedInUser?.followers?.includes(tweet.userId?._id || tweet.userId)
  );

  return (
    <div className="w-[47%] flex-1  border-none lg:border-gray-700 lg:border-2 h-screen overflow-y-auto hide-scrollbar ">
      {location.pathname !== "/liked" && <TweetInput />}
      {location.pathname === "/tweets" && <TweetCard tweets={tweets} />}
      {location.pathname === "/liked" && <TweetCard tweets={liked} />}
      {location.pathname === "/follower" && <TweetCard tweets={followers} />}
      {location.pathname === "/following" && <TweetCard tweets={following} />}
      <Outlet/>
    </div>
  );
};

export default MainFeed;
