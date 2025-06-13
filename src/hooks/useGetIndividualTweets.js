import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIndividualTweets } from "../store/users/tweetSlice";
import { INDIVIDUAL_TWEETS } from "../utility/constants";

export const useGetIndividualTweets = (id) => {
  const dispatch = useDispatch();
  const refreshTrigger = useSelector((state) => state.tweets.refreshTrigger);

  useEffect(() => {
    if (!id) return; 
    const fetchData = async () => {
      try {
        const res = await axios.get(`${INDIVIDUAL_TWEETS}${id}`);
        if (res.data?.tweets) {
          dispatch(setIndividualTweets(res.data.tweets));
          console.log(res.data.tweets);
        }
      } catch (err) {
        console.error("Error fetching tweets:", err);
      }
    };

    fetchData();
  }, [dispatch, refreshTrigger, id]);
};
