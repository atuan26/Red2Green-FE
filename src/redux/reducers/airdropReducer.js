import { airdropConstants } from "../actions/airdropAction";

const initialState = {
  showFormModal: false,
  formModal: null,

  showDetailModal: false,
  detailModal: null,
  loading: false,
  // loadingAirdrop: false,
  // loadingForm: false,
  airdropList: { count: 0, results: [] },
  personalAirdropList: { count: 0, results: [] },
};

const airdropReducer = (state = initialState, action) => {
  switch (action.type) {
    case airdropConstants.LOAD_AIRDROP:
      return { ...state, airdropList: action.payload };
    case airdropConstants.LOAD_PERSONAL_AIRDROP:
      return { ...state, personalAirdropList: action.payload };

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
    case airdropConstants.JOIN_AIRDROP:
      return {
        ...state,
        detailModal: {
          ...state.detailModal,
          is_joined: true,
        },
      };
    case airdropConstants.UNJOIN_AIRDROP:
      return {
        ...state,
        detailModal: {
          ...state.detailModal,
          is_joined: false,
        },
      };
    case airdropConstants.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default airdropReducer;
