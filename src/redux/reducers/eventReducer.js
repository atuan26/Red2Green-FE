import { eventConstants } from "../actions/eventAction";

const eventReducer = (state = [], action) => {
  switch (action.type) {
    case eventConstants.LOAD_EVENT:
      return action.payload.map((event) => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))
    case eventConstants.ADD_EVENT:
      return [...state, action.payload.map((event) => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))];
    case eventConstants.EDIT_EVENT:
      return state.map((event, i) =>
        event.id === action.payload.id ? action.payload : event
      );
    case eventConstants.DELETE_EVENT:
      return state.filter((e, index) => e.id !== action.payload.id);

    default:
      return state;
  }
};

export default eventReducer;
