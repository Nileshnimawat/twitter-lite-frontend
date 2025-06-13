import  { 
  useState, 
  useDispatch, 
  NavLink, 
  useLocation, 
  toast, 
  axios } from "../../utility/libs";

import { CREATE_TWEET } from "../../utility/constants";
import { toggleRefresh } from "../../store/users/tweetSlice";


const TweetInput = () => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handlePost = async () => {
    try {
      const res = await axios.post(CREATE_TWEET, { description });
      toast.success(res.data.message);
      dispatch(toggleRefresh());
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating tweet");
      console.log(err);
    }
    setDescription("");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Tabs */}
      <div className="sticky top-0 bg-black p-4 text-white flex gap-8 border-b border-gray-800">
        <NavLink
          to="/tweets"
          className={`font-bold pb-2 ${isActive("/tweets") ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-500"}`}
        >
          For you
        </NavLink>
        <NavLink
          to="/follower"
          className={`pb-2 ${isActive("/follower") ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-500"}`}
        >
          Followers
        </NavLink>
        <NavLink
          to="/following"
          className={`pb-2 ${isActive("/following") ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-500"}`}
        >
          Following
        </NavLink>
      </div>

      {/* Tweet Input */}
      <div className="p-4 text-white border-gray-700">
        <input
          type="text"
          placeholder="What’s happening?"
          className="bg-black w-full text-lg p-2 placeholder-gray-500 focus:outline-none"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3 text-blue-400 text-xl">
            <button title="Comment" className="hover:text-blue-400">
              💬
            </button>
            <button title="Like" className="hover:text-red-500">
              ❤️
            </button>
          </div>
          <button
            onClick={handlePost}
            className="bg-blue-500 px-4 py-1 rounded-full font-bold hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default TweetInput;
