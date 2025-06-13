import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserTweets } from "../store/users/tweetSlice";
import { ALL_USERS_TWEETS } from "../utility/constants";

export const useGetAllTweets = () => {
  const dispatch = useDispatch();
  const refreshTrigger = useSelector((state) => state.tweets.refreshTrigger); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(ALL_USERS_TWEETS,{ withCredentials: true });
        if (res.data?.tweets) {
          dispatch(setUserTweets(res.data.tweets));
        }
      } catch (err) {
        console.error("Error fetching tweets:", err);
      }
    };

    fetchData();
  }, [dispatch, refreshTrigger]); 
};
