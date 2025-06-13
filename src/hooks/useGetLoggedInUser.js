// In App.jsx or a top-level component
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/users/userSlice";
import axios from "axios";
import { MY_PROFILE } from "../utility/constants";

export const useGetLoggedInUser = ()=> {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(MY_PROFILE, 
        { withCredentials: true });
        if (res.data && res.data.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [MY_PROFILE, dispatch]);
}