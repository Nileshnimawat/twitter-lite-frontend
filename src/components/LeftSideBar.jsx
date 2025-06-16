import { Home, Search, Bell, Users, User, MoreHorizontal } from "lucide-react";
import { useSelector, useNavigate, toast, axios, logo, useLocation, useDispatch } from "../utility/libs";
import { setUser } from "../store/users/userSlice";
import { LOGOUT } from "../utility/constants";

const LeftSideBar = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname === "/messages"

  const handleLogout = async () => {
    try {
      const res = await axios.post(LOGOUT, {}, { withCredentials: true });
      toast.success(res.data.message);
      console.log(res);
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const menuItems = [
    {
      name: "Home",
      icon: <Home />,
      onClick: () => navigate("/tweets"),
    },
    {
      name: "Explore",
      icon: <Search />,
      onClick: () => navigate("/explore"),
    },
    {
      name: "Messages",
      icon: <Bell />,
      onClick: () => navigate("/messages"),
    },
    {
      name: "Liked",
      icon: <Users />,
      onClick: () => navigate("/liked"),
    },
    {
      name: "Profile",
      icon: <User />,
      onClick: () => user?._id && navigate(`/profile/${user._id}`),
    },
    // {
    //   name: "More",
    //   icon: <MoreHorizontal />,
    //   onClick: () => navigate("/more"),
    // },
  ];

  return (
    <div
      className={
        isOpen
          ? "w-full "
          : ` hidden  xl:w-[22%] ${path ? "xl:w-[27%]":" "} h-screen md:flex flex-col justify-between p-5 text-white  border-gray-700 border-2 border-t border-b border-l `
      }
    >
      <div className="text-white ">
        <div className="hidden xl:block text-3xl font-bold mb-6 ">X</div>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-5 mb-4 hover:bg-gray-800 p-2 rounded cursor-pointer"
            onClick={item.onClick}
          >
            {item.icon}
            <span
              onClick={() => {
                if (window.innerWidth < 500) {
                  setIsOpen(!isOpen);
                }
              }}
              className=" xl:block text-xl font-bold"
            >
              {item.name}
            </span>
          </div>
        ))}
        <button
          className="bg-gray-200 text-black py-2 rounded-full w-full mt-4 font-bold hover:text-lg"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      <div
        className="hidden xl:flex  lg:flex-row  xl:items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer "
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <div className=" flex items-center justify-center ">
          <img className=" w-11 h-11 rounded-full" src={user?.profileImage || logo} alt="profileImage" />
        </div>
        <div className=" lg:block ">
          <div>{user?.name || "Unknown"}</div>
          <div className="text-sm text-gray-400">
            {user?.username || "unknown"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
