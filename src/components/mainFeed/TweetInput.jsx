import {
  useState,
  useDispatch,
  NavLink,
  useLocation,
  toast,
  axios,
  logo,
  useSelector,
} from "../../utility/libs";
import imageCompression from "browser-image-compression"; 
import { CREATE_TWEET } from "../../utility/constants";
import { toggleRefresh } from "../../store/users/tweetSlice";

const TweetInput = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); 
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setImage(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
    } catch (err) {
      toast.error("Failed to compress image");
      console.error(err);
    }
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      if (image) formData.append("image", image);

      const res = await axios.post(CREATE_TWEET, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      dispatch(toggleRefresh());
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating tweet");
      console.log(err);
    }

    setDescription("");
    setImage(null);
    setPreview(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      
      <div className="sticky top-0 bg-black p-4 text-white flex gap-8 border-t border-1 border-l border-r border-gray-800">
        <NavLink
          to="/tweets"
          className={`font-bold pb-2 ${
            isActive("/tweets")
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          For you
        </NavLink>
        <NavLink
          to="/follower"
          className={`pb-2 ${
            isActive("/follower")
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Followers
        </NavLink>
        <NavLink
          to="/following"
          className={`pb-2 ${
            isActive("/following")
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Following
        </NavLink>
      </div>

      {/* Tweet Input */}
      <div className="p-4 text-white border-gray-700 border-1 border-l border-r">
        <div className="flex gap-1">
          <img
            src={user?.profileImage || logo}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What’s happening?"
            className="bg-black w-full text-lg p-2 placeholder-gray-500 focus:outline-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="preview"
              className="max-h-60 object-cover rounded-lg border border-gray-600"
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <label className="text-blue-400 text-xl cursor-pointer">
            📂
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
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

