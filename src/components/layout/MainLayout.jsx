import {
  RightSideBar,
  LeftSideBar,
  useState,
  NavBar,
  useLocation,
  Message,
  useNavigate,
  useSelector
} from "../../utility/libs";

const MainLayout = ({ children }) => {
  const loggedInUser = useSelector((state) => state.users.user);

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center bg-black ">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="bg-black min-h-screen font-sans flex w-full xl:w-[84%]  ">
        <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
        {location.pathname === "/messages" ? <Message /> : <RightSideBar />}
      </div>
    </div>
  );
};

export default MainLayout;
