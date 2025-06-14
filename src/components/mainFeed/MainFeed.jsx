import { 
  useSelector, 
  useLocation,
  TweetInput,
  TweetCard,
Outlet,
} from "../../utility/libs";


const MainFeed = () => {
  const location = useLocation();
  const loggedInUser = useSelector((state) => state.users.user);
  const tweets = useSelector((state) => state.tweets.userTweets);
  


  const likedTweets = loggedInUser?.liked || [];
  const liked = tweets?.filter((tweet) => likedTweets.includes(tweet._id)) || [];

  const following = tweets?.filter((tweet) =>
    loggedInUser?.following?.includes(tweet.userId?._id || tweet.userId)
  );

  const followers = tweets?.filter((tweet) =>
    loggedInUser?.followers?.includes(tweet.userId?._id || tweet.userId)
  );

  return (
    <div className="w-[47%] flex-1  border-gray-700 border-2 border-l border-t border-b h-screen overflow-y-auto hide-scrollbar ">
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
