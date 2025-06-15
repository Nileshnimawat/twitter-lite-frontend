import React from "react";
import { GET_MESSAGES } from "../utility/constants";
import { useSelector, useDispatch, useEffect,axios } from "../utility/libs";
import { setMessages } from "../store/users/messageSlice";

export const useGetMessages = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.users.selectedUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${GET_MESSAGES}/${selectedUser._id}`, {
          withCredentials: true,
        });
        console.log(res.data);
        dispatch(setMessages(res.data.Messages));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [selectedUser]);
};


