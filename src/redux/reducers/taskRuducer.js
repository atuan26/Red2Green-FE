import { taskConstants } from "../actions/taskAction";

const initialState = {
  currentCategory: { id: null },
  editingTask: {},
  taskList: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.LOAD_TASK:
      return { ...state, taskList: action.payload };
    case taskConstants.ADD_TASK:
      return { ...state, taskList: [...state.taskList, action.payload] };
    case taskConstants.SET_EDIT:
      return {
        ...state,
        editingTask: action.payload,
      };
    case taskConstants.SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case taskConstants.EDIT_TASK:
      return {
        ...state,
        taskList: state.taskList.map((event, i) =>
          event.id === action.payload.id ? action.payload : event
        ),
        editingTask: {},
      };
    case taskConstants.DELETE_TASK:
      return {
        ...state,
        taskList: state.taskList.filter((e, index) => e.id !== action.payload),
      };
    default:
      return state;
  }
};

export default taskReducer;
