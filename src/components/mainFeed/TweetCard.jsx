import {
  useSelector,
  useDispatch,
  axios,
  toast,
  logo,
  useNavigate,
} from "../../utility/libs";

import { MessageSquare, Heart, HeartOff, Trash2 } from "lucide-react";
import { toggleTweetLike, deleteTweetById } from "../../store/users/tweetSlice";
import { setUserLiked } from "../../store/users/userSlice";
import { DELETE_TWEET, LIKE_DISLIKE } from "../../utility/constants";

const TweetCard = ({ tweets }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);
  const allUsers = useSelector((state) => state.users.otherUsers);
  const navigate = useNavigate();
  if (!currentUser) return null;
  if (!tweets || tweets.length === 0) {
    return <div className="text-center text-gray-400 mt-4">No tweets exist</div>;
  }

  const handleLiked = async (id) => {
    try {
      dispatch(setUserLiked(id));
      dispatch(toggleTweetLike({ userId: currentUser._id, tweetId: id }));
      const res = await axios.put(`${LIKE_DISLIKE}/${id}`, {}, { withCredentials: true });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${DELETE_TWEET}/${id}`, {
        withCredentials: true,
        data: {},
      });
      toast.success(res.data.message);
      dispatch(deleteTweetById(id));
    } catch (err) {
      toast.error("Failed to delete tweet");
    }
  };

  return (
    <>
      {tweets.map((tweet) => {
        const userId = tweet.userId;
        const tweetUser = [...allUsers, currentUser].find((u) => u._id === userId);
        const isLiked = tweet.likes?.includes(currentUser._id);
        const likeCount = tweet.likes?.length || 0;

        return (
          <div
            key={tweet._id}
            className="border-gray-700 border-1 border-l border-r p-4 text-white flex flex-col gap-2 rounded-md"
          >
            <div className="flex justify-between items-center">
              <div 
              className="flex gap-3 items-center">
                <img onClick={()=>navigate(`/profile/${tweetUser?._id}`)}
                  src={tweetUser?.profileImage || logo}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <span className="font-bold">
                    {tweetUser?.name || "Unknown User"}
                  </span>
                  <p className="text-sm text-gray-400">
                    @{tweetUser?.username || "unknown"}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white">{tweet.description}</p>

            {tweet.image && (
              <div className="w-full p-4">
                 <img
                src={tweet.image}
                alt="tweet"
                className="mt-3  max-h-96 w-full h-auto object-cover rounded-4xl border-2 border-gray-700"
              />
              </div>
             
            )}

            <div className="flex justify-between text-gray-500 mt-2 text-sm items-center">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                <span>{tweet.comments?.length || 0}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLiked(tweet._id)}
                  className="flex items-center gap-1 hover:text-red-500"
                >
                  {isLiked ? (
                    <HeartOff size={18} className="text-red-500" />
                  ) : (
                    <Heart size={18} />
                  )}
                  <span>{likeCount}</span>
                </button>

                {userId === currentUser._id && (
                  <button
                    onClick={() => handleDelete(tweet._id)}
                    className="text-red-500 hover:underline"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TweetCard;

