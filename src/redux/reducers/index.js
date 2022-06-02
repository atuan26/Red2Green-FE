import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as reduxFormReducer } from "redux-form";
import eventReducer from "./eventReducer";
import taskReducer from "./taskRuducer";
import signalReducer from "./signalReducer";
import notiReducer from "./notiReducer";
import airdropReducer from "./airdropReducer";

const appReducer = combineReducers({
  form: reduxFormReducer,
  auth: authReducer,
  airdrop: airdropReducer,
  event: eventReducer,
  task: taskReducer,
  signal: signalReducer,
  noti: notiReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
