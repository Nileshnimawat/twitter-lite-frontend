import { 
  useSelector, 
  useDispatch,
  axios, 
  toast,
  logo,
    } from "../../utility/libs";


import { MessageSquare, Heart, HeartOff, Trash2 } from "lucide-react";
import { toggleTweetLike, deleteTweetById } from "../../store/users/tweetSlice";
import {setUserLiked} from "../../store/users/userSlice"
import { DELETE_TWEET, LIKE_DISLIKE } from "../../utility/constants";

const TweetCard = ({tweets}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.users.user);

  if (!tweets || tweets.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-4">No tweets exist</div>
    );
  }

  const handleLiked = async (id) => {
    try {
      const res = await axios.put(`${LIKE_DISLIKE}/${id}`);
      dispatch(setUserLiked(id));
      dispatch(toggleTweetLike({userId: currentUser._id , tweetId: id}))
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${DELETE_TWEET}/${id}`);
      toast.success(res.data.message);
      dispatch(deleteTweetById(id));
    } catch (err) {
      toast.error("Failed to delete tweet");
    }
  };

  return (
    <>
      {tweets.map((tweet) => {
        const isLiked = tweet.likes?.includes(currentUser?._id);
        const likeCount = tweet.likes?.length || 0;

        return (
          <div
            key={tweet._id}
            className="border-gray-700 border-[1px] p-4 text-white flex flex-col gap-2 rounded-md"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img
                  src={tweet.userDetails?.[0]?.profileImage || logo}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <span className="font-bold">
                    {tweet.userDetails?.[0]?.name || "Unknown User"}
                  </span>
                  <p className="text-sm text-gray-400">
                    @{tweet.userDetails?.[0]?.username || "unknown"}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white">{tweet.description}</p>

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

                {(tweet.userId === currentUser?._id ||
                  tweet.userId?._id === currentUser?._id) && (
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