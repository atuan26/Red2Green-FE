import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as reduxFormReducer } from "redux-form";
import eventReducer from "./eventReducer";
import taskReducer from "./taskRuducer";
import signalReducer from "./signalReducer";

const appReducer = combineReducers({
  form: reduxFormReducer,
  auth: authReducer,
  event: eventReducer,
  task: taskReducer,
  signal: signalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
