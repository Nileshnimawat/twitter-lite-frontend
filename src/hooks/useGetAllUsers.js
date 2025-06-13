import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../store/users/userSlice';
import { ALL_OTHER_USERS } from '../utility/constants';

export const useGetAllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(ALL_OTHER_USERS);
        if (res.data && res.data.users) {
          dispatch(setOtherUsers(res.data.users));
        }
      } catch (err) {
        console.log(err);
      } 
    };
    fetchData();
  }, [ALL_OTHER_USERS, dispatch]);

};