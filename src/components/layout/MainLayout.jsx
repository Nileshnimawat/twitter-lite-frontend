import {
  RightSideBar,
  LeftSideBar,
  useEffect,
  useSelector,
  useState,
  NavLink,
  useNavigate,
} from "../../utility/libs";

const MainLayout = ({ children }) => {
  const user = useSelector((state) => state.users.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if(!user) {
    navigate("/");
  }

  return (
    <div className="w-full flex flex-col items-center bg-[#16181C]">
      <div className=" sm:hidden w-full flex justify-between p-1 bg-black">
        <div  onClick={() => setIsOpen(!isOpen)}
        className="text-3xl text-white font-bold mb-6">--</div>
        <div className="text-3xl text-white font-bold mb-6 ">X</div>
        <div onClick={() => navigate(`/profile/${user._id}`)}
          
          className=" text-white bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center font-bold m-1"
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      </div>
      <div className="bg-black min-h-screen font-sans flex w-full xl:w-[84%]  xl:border-gray-700">
        <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
        <RightSideBar />
      </div>
    </div>
  );
};

export default MainLayout;
