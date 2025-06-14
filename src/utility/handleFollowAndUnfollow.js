import { UNFOLLOW, FOLLOW } from "./constants";
import axios from "axios";
import toast from "react-hot-toast";
import { setUnFollow, setFollow } from "../store/users/userSlice";
import { useGetAllTweets } from "./libs";




export const handleFollowAndUnfollow = async (loggedInUser, id, dispatch) => {
    //follow
    if(loggedInUser.following.includes(id)){
      try {
        dispatch(setUnFollow(id));
        const res = await axios.post(`${UNFOLLOW}/${id}`,{},{ withCredentials: true });
        toast.success(res.data.message);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    //unfollow
    else{
      try {
        dispatch(setFollow(id));
        const res = await axios.post(`${FOLLOW}/${id}`,{},{ withCredentials: true });
        toast.success(res.data.message);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }