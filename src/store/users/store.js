import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tweetReducer from './tweetSlice'
import messageReducer from './messageSlice';
import socketReducer from './socketSlice';
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    tweets: tweetReducer,
    message: messageReducer,
    socket: socketReducer,
    loading: loadingReducer,
  },
});



