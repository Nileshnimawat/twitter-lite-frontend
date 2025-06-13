import {
  useState,
  useDispatch,
  useSelector,
  axios,
  toast,
  logo,
  useNavigate,
} from "../../utility/libs";

import { updateProfile } from "../../store/users/userSlice";
import { UPDATE_PROFILE } from "../../utility/constants";

const EditProfile = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleClose = () => {
    navigate(-1); 
  };

  const handleSave = async () => {
   
    try {
      const res = await axios.put(UPDATE_PROFILE, 
        {
          bio : bio,
          name : name
        }
        , 
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(updateProfile(res.data.user));
      navigate("/tweets");
    } catch (err) {
      toast.error("Failed to update profile");
      console.log(err);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-1/2 bg-black text-white p-6 rounded-lg border border-gray-700 z-50">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handleClose} className="text-xl">✖</button>
          <h2 className="text-lg font-semibold">Edit profile</h2>
          <button
            onClick={handleSave}
            className="bg-gray-800 px-4 py-1 rounded-full hover:bg-gray-700"
          >
            Save
          </button>
        </div>

        <div className="h-40 bg-gray-900 flex items-center justify-center relative rounded-md">
          <label className="cursor-pointer">
            <input type="file" className="hidden" />
            <div className="text-gray-300 bg-black bg-opacity-50 rounded-full p-2">📷</div>
          </label>
        </div>

        <div className="-mt-12 pl-4">
          <label className="relative cursor-pointer inline-block">
            <img
              src={user.image || logo}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-black object-cover"
            />
            <input type="file" onChange={handleImageChange} className="hidden" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-black bg-opacity-50 rounded-full">
              📷
            </div>
          </label>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm block">Name</label>
            <input
              type="text"
              className="w-full p-2 bg-black border border-gray-600 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm block">Bio</label>
            <textarea
              rows="3"
              className="w-full p-2 bg-black border border-gray-600 rounded"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

        </div>
      </div>
    </>
  );
};

export default EditProfile;


