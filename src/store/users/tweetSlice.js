import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTweets: [],
  individualTweets: [],
  refreshTrigger: false, // Make sure this is initialized if you're using it
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setUserTweets(state, action) {
      state.userTweets = action.payload;
    },

    setIndividualTweets(state, action) {
      state.individualTweets = action.payload;
    },

    deleteTweetById(state, action) {
      const idToDelete = action.payload;
      state.userTweets = state.userTweets.filter((tweet) => tweet._id !== idToDelete);
      state.individualTweets = state.individualTweets.filter((tweet) => tweet._id !== idToDelete);
    },

    toggleTweetLike(state, action) {
      const { tweetId, userId } = action.payload;

      const updateLikes = (tweetList) => {
        for (let tweet of tweetList) {
          if (tweet._id === tweetId) {
            if (tweet.likes.includes(userId)) {
              tweet.likes = tweet.likes.filter((id) => id !== userId);
            } else {
              tweet.likes.push(userId);
            }
          }
        }
      };

      updateLikes(state.userTweets);
      updateLikes(state.individualTweets);
    },

    toggleRefresh(state) {
      state.refreshTrigger = !state.refreshTrigger;
    },
    setTweetLiked(state,action){
      
    }
  },
});

export const {
  setUserTweets,
  setIndividualTweets,
  deleteTweetById,
  toggleTweetLike,
  toggleRefresh,
  setTweetLiked,
} = tweetSlice.actions;

export default tweetSlice.reducer;
