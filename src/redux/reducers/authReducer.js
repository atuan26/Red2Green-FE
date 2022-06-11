import { authConstants } from "../actions/authAction";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isAuthenticated: true, user }
  : { isAuthenticated: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.REGISTER_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case authConstants.LOGOUT_ALL:
      return {};
    default:
      return state;
  }
};

export default authReducer;
