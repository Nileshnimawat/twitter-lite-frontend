

import { useState, MessageSidebar, MessageChat, LeftSideBar, useSelector, useGetMessages, useGetAllUsers} from "../../utility/libs";


const Message = () => {
  useGetMessages();


  return (
    <>
      <div className="flex h-screen text-white bg-black w-full">
      <MessageSidebar/>
      <MessageChat  />
    </div>
    </>
  
  );
};

export default Message;
