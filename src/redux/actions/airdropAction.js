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
  UNJOIN_AIRDROP: "EDIT_AIRDROP",
  DELETE_AIRDROP: "DELETE_AIRDROP",

  SET_LOADING_AIRDROP: "SET_LOADING_AIRDROP",
  SET_LOADING_FORM: "SET_LOADING_FORM",

  SHOW_AIRDROP_DETAIL_MODAL: "SHOW_AIRDROP_DETAIL_MODAL",
  SHOW_AIRDROP_FORM_MODAL: "SHOW_AIRDROP_FORM_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
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
      });
  };
};

export const joinAirdrop = (id) => {
  return (dispatch) => {
    api
      .post(`/airdrops/${id}/join/`)
      .then((res) => {
        toast.success("Successfully!");
        dispatch(loadAirdrop());
        // dispatch({ type: airdropConstants.CLOSE_MODAL });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when joining airdrops.");
      });
  };
};

export const unJoinAirdrop = (id) => {
  return (dispatch) => {
    api
      .post(`/airdrops/${id}/unjoin/`)
      .then((res) => {
        toast.success("Successfully!");
        dispatch(loadAirdrop());
        // dispatch({ type: airdropConstants.CLOSE_MODAL });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error when unjoining airdrops.");
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
  };
  console.log("values", values);
  return api
    .post("/airdrops/", values)
    .then((res) => {
      console.log(res.data);
      toast.success("New airdrop added");
      dispatch(reset("airdropForm"));
      dispatch({ type: airdropConstants.CLOSE_MODAL });
      dispatch(loadAirdrop());
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
