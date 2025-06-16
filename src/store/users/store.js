import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // uses localStorage by default
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './userSlice';
import tweetReducer from './tweetSlice';
import messageReducer from './messageSlice';
import socketReducer from './socketSlice';
import loadingReducer from "./loadingSlice";


const rootReducer = combineReducers({
  users: userReducer,
  tweets: tweetReducer,
  message: messageReducer,
  socket: socketReducer,
  loading: loadingReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);


