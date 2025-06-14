import {
  RightSideBar,
  LeftSideBar,
  useState,
  NavBar
} from "../../utility/libs";

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-full flex flex-col items-center bg-black ">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="bg-black min-h-screen font-sans flex w-full xl:w-[84%]  ">
        <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
        <RightSideBar />
      </div>
    </div>
  );
};

export default MainLayout;
