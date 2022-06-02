import { toast } from "react-toastify";
import api from ".";

export const taskConstants = {
  LOAD_TASK: "LOAD_TASK",
  ADD_TASK: "ADD_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_EDIT: "SET_EDIT",
  SET_CATEGORY: "SET_CATEGORY",
};

export const loadTask = () => {
  return (dispatch) => {
    api
      .get("/todos/")
      .then((res) => {
        dispatch({ type: taskConstants.LOAD_TASK, payload: res.data });
        // toast.success("Task loaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when loading Tasks.");
      });
  };
};

export const addTask = (payload) => {
  return (dispatch) => {
    api
      .post("/todos/", payload)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: taskConstants.ADD_TASK, payload: res.data });
        toast.success("New Task added");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when adding Tasks.");
      });
  };
};

export const setEditingTask = (task) => {
  return (dispatch) => {
    dispatch({ type: taskConstants.SET_EDIT, payload: task });
  };
};
export const setCurrentCategory = (task) => {
  return (dispatch) => {
    dispatch({ type: taskConstants.SET_CATEGORY, payload: task });
  };
};

export const editTask = (payload) => {
  return (dispatch) => {
    api
      .put(`/todos/${payload.id}/`, payload)
      .then((res) => {
        console.log(res.data);
        toast.success("Task is edited");
        dispatch({ type: taskConstants.EDIT_TASK, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when editing Tasks.");
      });
  };
};
export const deleteTask = (payload) => {
  return (dispatch) => {
    api
      .delete("/todos/" + payload.id)
      .then((res) => {
        console.log(res.data);
        toast.success(payload.title + " is deleted.");
        dispatch({ type: taskConstants.DELETE_TASK, payload: payload.id });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when deleting task.");
      });
  };
};
