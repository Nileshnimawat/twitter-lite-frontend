import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  otherUsers: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setOtherUsers(state, action) {
      state.otherUsers = action.payload;
    },
    setFollow(state, action) {
      const id = action.payload;
      if (!state.user.following.includes(id)) {
        state.user.following.push(id);
      }
    },
    setUnFollow(state, action) {
      const id = action.payload;
      state.user.following = state.user.following.filter(
        (followingId) => followingId !== id
      );
    },

    setUserLiked(state, action) {
      const id = action.payload;
      if (state.user.liked.includes(id)) {
        state.user.liked = state.user.liked.filter((tweetId) => tweetId !== id);
      } else {
        state.user.liked.push(id);
      }
    },

    updateProfile(state, action) {
      const updatedUser = action.payload;
      state.user = { ...state.user, ...updatedUser };
    },

    setFollowers(state, action) {},
    setFollowing(state, action) {},
  },
});

export const {
  setUser,
  setOtherUsers,
  setFollow,
  setUnFollow,
  setUserLiked,
  updateProfile,
  setFollowers,
  setFollowing,
} = userSlice.actions;

export default userSlice.reducer;
