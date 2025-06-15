
import axios from "axios";
import {store} from "../store/users/store"; 
import { setLoading } from "../store/users/loadingSlice"; 


axios.interceptors.request.use((config) => {
  store.dispatch(setLoading(true));
  return config;
});

axios.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);
