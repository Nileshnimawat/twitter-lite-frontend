import { useNavigate, useSelector } from '../utility/libs';
const NavBar = ({
    setIsOpen, isOpen
}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.users.user);
  return (
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
  )
}

export default NavBar
