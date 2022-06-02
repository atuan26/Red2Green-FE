import store from "./../store";

export const notiConstants = {
  SHOW_COMFIRM_MODAL: "SHOW_COMFIRM_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",

  SHOW_LOGIN_FORM_MODAL: "SHOW_LOGIN_FORM_MODAL",
  SHOW_REGISTER_FORM_MODAL: "SHOW_REGISTER_FORM_MODAL",
  SHOW_FORGOT_PASSWORD_FORM_MODAL: "SHOW_FORGOT_PASSWORD_FORM_MODAL",
  CLOSE_FORM_MODAL: "CLOSE_FORM_MODAL",
};

export const showComfirmModal = (payload) => {
  store.dispatch({ type: notiConstants.SHOW_COMFIRM_MODAL, payload: payload });
};

export const closeConfirmModal = () => {
  store.dispatch({ type: notiConstants.CLOSE_MODAL });
};
