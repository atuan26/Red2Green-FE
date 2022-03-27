import { toast } from "react-toastify";
import { reset, SubmissionError } from "redux-form";
import api from ".";

export const airdropConstants = {
  LOAD_AIRDROP: "LOAD_AIRDROP",
  ADD_AIRDROP: "ADD_AIRDROP",
  EDIT_AIRDROP: "EDIT_AIRDROP",
  DELETE_AIRDROP: "DELETE_AIRDROP",
};

export const loadAirdop = () => {
  const loadAirdopSuccess = (payload) => {
    return { type: airdropConstants.LOAD_AIRDROP, payload };
  };
  return (dispatch) => {
    api
      .get("/airdrops/")
      .then((res) => {
        dispatch(loadAirdopSuccess(res.data));
        toast.success("Airdop loaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when loading airdrops.");
      });
  };
};

export const addAirdop = (payload, dispatch) => {
  console.log(payload);
  const addAirdopSuccess = (payload) => {
    return { type: airdropConstants.ADD_AIRDROP, payload };
  };
  return api
    .post("/airdrops/", payload)
    .then((res) => {
      console.log(res.data);
      dispatch(addAirdopSuccess(res.data));
      toast.success("New airdrop added");
      dispatch(reset("airdropForm"));
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error when adding airdrops.");
      throw new SubmissionError({
        _error: "Add failed!",
      });
    });
};

export const editAirdop = (payload, dispatch) => {
  return api
    .put(`/airdrops/${payload.id}/`, payload)
    .then((res) => {
      console.log(res.data);
      toast.success("Airdop is edited");
      dispatch({ type: airdropConstants.EDIT_AIRDROP, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error when editing airdrops.");
      throw new SubmissionError({
        _error: "Edit failed!",
      });
    });
};
export const deleteAirdop = (payload) => {
  return (dispatch) => {
    api
      .delete("/airdrops/" + payload.id)
      .then((res) => {
        console.log(res.data);
        toast.success(payload.title + " is deleted.");
        dispatch({ type: airdropConstants.DELETE_AIRDROP, payload });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when deleting airdrops.");
      });
  };
};
