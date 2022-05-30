import { notiConstants } from "../actions/notiAction";

const initialState = {
  confirmModal: {
    active: false,
    message: {
      label: "Confirm?",
      confirm: "Yes, OK.",
      cancel: "No, cancel.",
    },
    onConfirm: () => {},
  },
};

const notiReducer = (state = initialState, action) => {
  switch (action.type) {
    case notiConstants.SHOW_COMFIRM_MODAL:
      return { ...state, confirmModal: action.payload };
    case notiConstants.CLOSE_MODAL:
      return { ...state, confirmModal: initialState.confirmModal };
    default:
      return state;
  }
};

export default notiReducer;
