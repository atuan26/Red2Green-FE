import { toast } from "react-toastify";
import { reset, SubmissionError } from "redux-form";
import api from ".";

export const eventConstants = {
  LOAD_EVENT: "LOAD_EVENT",
  ADD_EVENT: "ADD_EVENT",
  EDIT_EVENT: "EDIT_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
};

export const loadEvent = () => {
  const loadEventSuccess = (payload) => {
    return { type: eventConstants.LOAD_EVENT, payload };
  };
  return (dispatch) => {
    api
      .get("/events/")
      .then((res) => {
        dispatch(loadEventSuccess(res.data));
        toast.success("Event loaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when loading events.");
      });
  };
};

export const addEvent = (payload, dispatch) => {
  const addEventSuccess = (payload) => {
    return { type: eventConstants.ADD_EVENT, payload };
  };
  return api
    .post("/events/", payload)
    .then((res) => {
      console.log(res.data);
      dispatch(addEventSuccess(res.data));
      toast.success("New event added");
      dispatch(reset("eventForm"));
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error when adding events.");
      throw new SubmissionError({
        _error: "Add failed!",
      });
    });
};

export const editEvent = (payload, dispatch) => {
  return api
    .put(`/events/${payload?.id}/`, payload)
    .then((res) => {
      console.log(res.data);
      toast.success("Event is edited");
      dispatch({ type: eventConstants.EDIT_EVENT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error when editing events.");
      throw new SubmissionError({
        _error: "Edit failed!",
      });
    });
};
export const deleteEvent = (payload) => {
  return (dispatch) => {
    api
      .delete("/events/" + payload.id)
      .then((res) => {
        console.log(res.data);
        toast.success(payload.title + " is deleted.");
        dispatch({ type: eventConstants.DELETE_EVENT, payload });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when deleting events.");
      });
  };
};
