const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const ALL_USERS_TWEETS = `${BASE_URL}/api/v1/tweet/getAllTweets`;
export const ALL_OTHER_USERS = `${BASE_URL}/api/v1/user/getAllUsers`;
export const CREATE_TWEET = `${BASE_URL}/api/v1/tweet/createTweet`;

// Auth
export const LOGOUT = `${BASE_URL}/api/v1/user/logout`;
export const LOGIN = `${BASE_URL}/api/v1/user/login`;
export const SIGNUP = `${BASE_URL}/api/v1/user/signup`;

export const MY_PROFILE = `${BASE_URL}/api/v1/user/myprofile`;
export const INDIVIDUAL_TWEETS = `${BASE_URL}/api/v1/tweet/getIndividualTweets/`;

export const USER_END_POINT = `${BASE_URL}/api/v1/user/`;
export const TWEET_END_POINT = `${BASE_URL}/api/v1/tweet/`;

export const FOLLOW = `${BASE_URL}/api/v1/user/follow`;
export const UNFOLLOW = `${BASE_URL}/api/v1/user/unfollow`;

export const SEARCH = `${BASE_URL}/api/v1/user/search?query=`;

