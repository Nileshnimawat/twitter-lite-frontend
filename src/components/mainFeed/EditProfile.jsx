import {
  useState,
  useEffect,
  useDispatch,
  useSelector,
  axios,
  toast,
  logo,
  useNavigate,
  useGetLoggedInUser,
} from "../../utility/libs";

import { updateProfile } from "../../store/users/userSlice";
import { UPDATE_PROFILE } from "../../utility/constants";



const EditProfile = () => {
  useGetLoggedInUser();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(logo);
  const [coverPreview, setCoverPreview] = useState(logo);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setPreview(user.profileImage || logo);
      setCoverPreview(user.coverImage || logo);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (profileImage) formData.append("profileImage", profileImage);
      if (coverImage) formData.append("coverImage", coverImage);

      const res = await axios.put(UPDATE_PROFILE, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      dispatch(updateProfile(res.data.user));
      navigate("/tweets");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
      ></div>

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

        {/* Cover Preview */}
        <div className="h-40 bg-gray-900 flex items-center justify-center relative rounded-md overflow-hidden">
          <img
            src={coverPreview || logo}
            alt="cover preview"
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => (e.target.src = logo)}
          />
          <label className="cursor-pointer z-10">
            <input type="file" onChange={handleCoverChange} className="hidden" />
            <div className="text-gray-300 bg-black bg-opacity-50 rounded-full p-2">
              📷
            </div>
          </label>
        </div>

        {/* Profile Image Preview */}
        <div className="-mt-12 pl-4">
          <label className="relative cursor-pointer inline-block">
            <img
              src={preview || logo}
              alt="profile preview"
              className="w-24 h-24 rounded-full border-4 border-black object-cover"
              onError={(e) => (e.target.src = logo)}
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-black bg-opacity-50 rounded-full">
              📷
            </div>
          </label>
        </div>

        {/* Name and Bio */}
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
