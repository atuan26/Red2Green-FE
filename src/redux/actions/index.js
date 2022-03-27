import axios from "axios";
import { toast } from "react-toastify";
import store from "../store";

let api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 1000,
});

api.interceptors.request.use(function (config) {
  let token = JSON.parse(localStorage.getItem("user"));
  token = token && token.token ? token.token : null;
  config.headers.Authorization = token && "Token " + token;
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      toast("SESSION EXPIRED");
      store.dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
export default api;
