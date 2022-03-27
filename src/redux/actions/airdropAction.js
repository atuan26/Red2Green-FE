import { toast } from "react-toastify";
import { reset, SubmissionError } from "redux-form";
import api from ".";

export const airdropConstants = {
  LOAD_AIRDROP: "LOAD_AIRDROP",
  ADD_AIRDROP: "ADD_AIRDROP",
  EDIT_AIRDROP: "EDIT_AIRDROP",
  DELETE_AIRDROP: "DELETE_AIRDROP",
};

export const loadAirdrop = () => {
  const loadAirdropSuccess = (payload) => {
    return { type: airdropConstants.LOAD_AIRDROP, payload };
  };
  return (dispatch) => {
    api
      .get("/airdrops/")
      .then((res) => {
        dispatch(loadAirdropSuccess(res.data));
        toast.success("Airdrop loaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when loading airdrops.");
      });
  };
};

export const addAirdrop = (payload, dispatch) => {
  console.log(payload);
  const addAirdropSuccess = (payload) => {
    return { type: airdropConstants.ADD_AIRDROP, payload };
  };
  return api
    .post("/airdrops/", payload)
    .then((res) => {
      console.log(res.data);
      dispatch(addAirdropSuccess(res.data));
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

export const editAirdrop = (payload, dispatch) => {
  return api
    .put(`/airdrops/${payload.id}/`, payload)
    .then((res) => {
      console.log(res.data);
      toast.success("Airdrop is edited");
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
export const deleteAirdrop = (payload) => {
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
