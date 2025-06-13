import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tweetReducer from './tweetSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    tweets: tweetReducer,
  },
});



