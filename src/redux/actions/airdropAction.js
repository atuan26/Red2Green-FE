import { toast } from "react-toastify";
import { reset, SubmissionError } from "redux-form";
import api from ".";
import { MdOutlineContactMail, MdOutlineEmail } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { ReactComponent as CoinmarketCap } from "./coinmarketcap-1.svg";

import {
  FaFacebookSquare,
  FaTelegramPlane,
  FaTwitterSquare,
  FaDiscord,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { BsMedium } from "react-icons/bs";

export const airdropConstants = {
  LOAD_AIRDROP: "LOAD_AIRDROP",
  JOIN_AIRDROP: "JOIN_AIRDROP",
  UNJOIN_AIRDROP: "UNJOIN_AIRDROP",
  APPROVE_AIRDROP: "APPROVE_AIRDROP",
  DECLINE_AIRDROP: "DECLINE_AIRDROP",
  DELETE_AIRDROP: "DELETE_AIRDROP",

  SET_LOADING: "SET_LOADING",

  LOAD_INITIALVALUES: "LOAD_INITIALVALUES",
  SHOW_AIRDROP_DETAIL_MODAL: "SHOW_AIRDROP_DETAIL_MODAL",
  SHOW_AIRDROP_FORM_MODAL: "SHOW_AIRDROP_FORM_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",

  LOAD_PERSONAL_AIRDROP: "LOAD_PERSONAL_AIRDROP",
};

export const socialList = [
  {
    value: "kyc",
    icon: (
      <MdOutlineContactMail className="text-indigo-500 inline w-5 h-5 mr-2 mb-1" />
    ),
    label: "KYC",
  },
  {
    value: "phone",
    icon: <ImPhone className="text-yellow-400 inline w-5 h-5 mr-2 mb-1" />,
    label: "Phone Number",
  },
  {
    value: "email",
    icon: (
      <MdOutlineEmail className="text-orange-500 inline w-5 h-5 mr-2 mb-1" />
    ),
    label: "Email",
  },
  {
    value: "telegram",
    icon: (
      <FaTelegramPlane className="text-[#26a5e4] inline w-5 h-5 mr-2 mb-1" />
    ),
    label: "Telegram",
  },
  {
    value: "twitter",
    icon: (
      <FaTwitterSquare className="text-[#1d9cf0] inline w-5 h-5 mr-2 mb-1" />
    ),
    label: "Twitter",
  },
  {
    value: "facebook",
    icon: (
      <FaFacebookSquare className="text-[#4867aa] inline w-5 h-5 mr-2 mb-1" />
    ),
    label: "Facebook",
  },
  {
    value: "discord",
    icon: <FaDiscord className="text-[#6274c6] inline w-5 h-5 mr-2 mb-1" />,
    label: "Discord",
  },
  {
    value: "medium",
    icon: <BsMedium className="text-[#000] inline w-5 h-5 mr-2 mb-1" />,
    label: "Medium",
  },
  {
    value: "instagram",
    icon: <FaInstagram className="text-[#a13590] inline w-5 h-5 mr-2 mb-1" />,
    label: "Instagram",
  },
  {
    value: "coinmarketcap",
    icon: <CoinmarketCap className=" inline w-5 h-5 mr-2 mb-1" />,
    label: "CoinMarketCap",
  },
  {
    value: "linkedin",
    icon: <FaLinkedin className="text-[#0a66c2] inline w-5 h-5 mr-2 mb-1" />,
    label: "Linkedin",
  },
];

export const loadAirdrop = () => {
  const loadAirdropSuccess = (payload) => {
    return { type: airdropConstants.LOAD_AIRDROP, payload };
  };
  return (dispatch) => {
    api
      .get("/airdrops/")
      .then((res) => {
        dispatch(loadAirdropSuccess(res.data));
        // toast.success("Airdrop loaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when loading airdrops.");
        dispatch(loadAirdropSuccess({ count: 0, results: [] }));
      });
  };
};
export const loadPersonalAirdrop = () => {
  const loadAirdropSuccess = (payload) => {
    return { type: airdropConstants.LOAD_PERSONAL_AIRDROP, payload };
  };
  return (dispatch) => {
    api
      .get("/airdrops/personal_airdrop/")
      .then((res) => {
        dispatch(loadAirdropSuccess(res.data));
        // toast.success("Airdrop loaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when loading airdrops.");
        dispatch(loadAirdropSuccess({ count: 0, results: [] }));
      });
  };
};

export const joinAirdrop = (id) => {
  return (dispatch) => {
    api
      .post(`/airdrops/${id}/join/`)
      .then((res) => {
        toast.success("Successfully!");
        dispatch({ type: airdropConstants.SET_LOADING, payload: true });
        dispatch({ type: airdropConstants.JOIN_AIRDROP, payload: id });
        dispatch({ type: airdropConstants.SET_LOADING, payload: false });
        dispatch(loadAirdrop());
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when joining airdrops.");
        return err;
      });
  };
};

export const unJoinAirdrop = (id) => {
  return (dispatch) => {
    api
      .post(`/airdrops/${id}/unjoin/`)
      .then((res) => {
        toast.success("Successfully!");
        dispatch({ type: airdropConstants.SET_LOADING, payload: true });
        dispatch({ type: airdropConstants.UNJOIN_AIRDROP, payload: id });
        dispatch({ type: airdropConstants.SET_LOADING, payload: false });
        dispatch(loadAirdrop());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const approveAirdrop = (id) => {
  return (dispatch) => {
    api
      .post(`/airdrops/${id}/approve_airdrop/`)
      .then((res) => {
        toast.success("Successfully!");
        dispatch({ type: airdropConstants.SET_LOADING, payload: true });
        dispatch(loadPersonalAirdrop());
        // dispatch({ type: airdropConstants.UNJOIN_AIRDROP, payload: id });
        dispatch({ type: airdropConstants.SET_LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const declineAirdrop = (id) => {
  return (dispatch) => {
    api
      .post(`/airdrops/${id}/decline_airdrop/`)
      .then((res) => {
        toast.success("Successfully!");
        dispatch({ type: airdropConstants.SET_LOADING, payload: true });
        // dispatch({ type: airdropConstants.UNJOIN_AIRDROP, payload: id });
        dispatch(loadPersonalAirdrop());
        dispatch({ type: airdropConstants.SET_LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addAirdrop = (payload, dispatch) => {
  console.log("payload", payload);
  let values = {
    ...payload,
    information: {
      ...payload.information,
      requirement: payload?.information?.requirement?.map((r) => ({
        value: r.value,
        label: r.label,
      })),
    },
    task_list: payload?.task_list?.filter(
      (task) => Object.keys(task).length > 0
    ),
  };
  return api
    .post("/airdrops/", values)
    .then((res) => {
      console.log(res.data);
      toast.success("New airdrop added");
      dispatch(reset("airdropForm"));
      dispatch({ type: airdropConstants.CLOSE_MODAL });
      dispatch(loadPersonalAirdrop());
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
  console.log("payload", payload);
  let values = {
    ...payload,
    information: {
      ...payload.information,
      requirement: payload?.information?.requirement?.map((r) => ({
        value: r.value,
        label: r.label,
      })),
    },
    task_list: payload?.task_list?.filter(
      (task) => Object.keys(task).length > 0
    ),
  };
  return api
    .put(`/airdrops/${payload.id}/`, values)
    .then((res) => {
      console.log(res.data);
      toast.success("Airdrop is edited");
      dispatch(reset("airdropForm"));
      dispatch({ type: airdropConstants.CLOSE_MODAL });
      dispatch(loadPersonalAirdrop());
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
      .delete(`/airdrops/${payload.id}/`)
      .then((res) => {
        console.log(res.data);
        toast.success(payload.name + " is deleted.");
        dispatch(loadPersonalAirdrop());
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when deleting airdrops.");
      });
  };
};

export const loadInitialValuesForm = (payload) => ({
  type: airdropConstants.LOAD_INITIALVALUES,
  payload,
});

export const destroyAirdropForm = () => {
  return (dispatch) => {
    dispatch(reset("airdropForm"));
  };
};
