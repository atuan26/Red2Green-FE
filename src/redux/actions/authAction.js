// import axios from "axios";
import { toast } from "react-toastify";
import { SubmissionError } from "redux-form";
import api from "./index";
import { CgHello } from "react-icons/cg";

export const authConstants = {
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",

  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  LOGOUT: "LOGOUT",
  LOGOUT_ALL: "LOGOUT_ALL",
};

export const login = (values, dispatch) => {
  const success = (payload) => ({
    type: authConstants.LOGIN_SUCCESS,
    payload,
  });
  return api
    .post("/auth/login/", values)
    .then((res) => {
      toast(`Hello, ${res.data.user.username} !`, {
        icon: <CgHello className="w-6 h-6 text-lime-600" />,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(success(res.data));
    })
    .catch((error) => {
      toast.error("Login failed!");
      throw new SubmissionError({
        username: Object.values(error.response.data)[0][0],
        _error: "Login failed!",
      });
    });
};
export const register = (values, dispatch) => {
  const success = (payload) => ({
    type: authConstants.REGISTER_SUCCESS,
    payload,
  });
  return api
    .post("/auth/register/", values)
    .then((res) => {
      toast.success("Register successfully!");
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(success(res.data));
    })
    .catch((error) => {
      toast.error("Register failed!");
      console.log(error.response.data);
      throw new SubmissionError(error.response.data);
    });
};

export const logout = () => (dispatch) =>
  api
    .post("/auth/logout/")
    .then(() => {
      localStorage.removeItem("user");
      toast.info("Logout successfully!");
      dispatch({ type: authConstants.LOGOUT });
    })
    .catch((error) => {
      toast.error("error");
    });
