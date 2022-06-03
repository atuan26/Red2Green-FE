import { airdropConstants } from "../actions/airdropAction";

const initialState = {
  showFormModal: false,
  formModal: null,

  showDetailModal: false,
  detailModal: null,
  // loadingAirdrop: false,
  // loadingForm: false,
  airdropList: { count: 0, results: [] },
};

const airdropReducer = (state = initialState, action) => {
  switch (action.type) {
    case airdropConstants.LOAD_AIRDROP:
      return { ...state, airdropList: action.payload };

    case airdropConstants.SHOW_AIRDROP_DETAIL_MODAL:
      return {
        ...state,
        showDetailModal: true,
        detailModal: action.payload,
      };

    case airdropConstants.SHOW_AIRDROP_FORM_MODAL:
      return {
        ...state,
        showFormModal: true,
        formModal: action.payload,
      };

    case airdropConstants.CLOSE_MODAL:
      return {
        ...state,
        showFormModal: false,
        formModal: initialState.formModal,
        showDetailModal: false,
        detailModal: initialState.detailModal,
      };

    default:
      return state;
  }
};

export default airdropReducer;
