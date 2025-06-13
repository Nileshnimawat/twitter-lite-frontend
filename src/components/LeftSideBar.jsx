import {Home,Search,Bell,Users,User,MoreHorizontal,} from "lucide-react";
import { 
  useSelector, 
  useNavigate, 
  toast, 
  axios } from "../utility/libs";

import { LOGOUT } from "../utility/constants";


const LeftSideBar = ({isOpen, setIsOpen}) => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
      const res = await axios.post(LOGOUT);
      toast.success(res.data.message);
      console.log(res);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
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
      name: "Notifications",
      icon: <Bell />,
      onClick: () => navigate("/notifications"),
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
    {
      name: "More",
      icon: <MoreHorizontal />,
      onClick: () => navigate("/more"),
    },
  ];

  return (
    <div className={isOpen? "w-full ":" hidden  xl:w-[22%] h-screen md:flex flex-col justify-between p-5 text-white bg-[#16181C] border-gray-700 border-r-2   "}>
    
      <div className="text-white   border-gray-700">
        <div className="hidden xl:block text-3xl font-bold mb-6 ">X</div>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-5 mb-4 hover:bg-gray-800 p-2 rounded cursor-pointer"
            onClick={item.onClick}
          >
            {item.icon}
            <span onClick={()=>setIsOpen(!isOpen)} className=" xl:block text-xl font-bold">{item.name}</span>
          </div>
        ))}
        <button
          className="bg-gray-200 text-black py-2 rounded-full w-full mt-4 font-bold hover:text-lg"
          onClick={ handleLogout}
        >
          logout
        </button>
      </div>

      <div
        className="hidden xl:flex  lg:flex-row  xl:items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer "
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <div className="bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div className=" lg:block ">
          <div>{user?.name || "Unknown"}</div>
          <div className="text-sm text-gray-400">{user?.username || "unknown"}</div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;