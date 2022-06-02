import { airdropConstants } from "../actions/airdropAction";

const initialState = {
  showFormModal: false,
  // loadingAirdrop: false,
  // loadingForm: false,
  formModal: { type: null, data: null },
  airdropList: { count: 0, results: [] },
};

const airdropReducer = (state = initialState, action) => {
  switch (action.type) {
    case airdropConstants.LOAD_AIRDROP:
      return { ...state, airdropList: action.payload };
    // case airdropConstants.ADD_AIRDROP:
    // return { ...state, airdropList: {...state.airdropList, action.payload} };
    // case airdropConstants.EDIT_AIRDROP:
    // return {
    // ...state,
    // airdropList: state.map((airdop, i) =>
    // airdop.id === action.payload.id ? action.payload : airdop
    // ),
    // };
    // case airdropConstants.DELETE_AIRDROP:
    //   return {
    //     ...state,
    //     airdropList: state.filter((e, index) => e.id !== action.payload.id),
    //   };

    case airdropConstants.SHOW_AIRDROP_DETAIL_MODAL:
      return {
        ...state,
        showFormModal: true,
        formModal: { type: 2, airdrop: action.payload },
      };
    case airdropConstants.SHOW_AIRDROP_FORM_MODAL:
      return {
        ...state,
        showFormModal: true,
        formModal: { type: 1, airdrop: action.payload },
      };
    case airdropConstants.CLOSE_MODAL:
      return {
        ...state,
        showFormModal: false,
        formModal: initialState.formModal,
      };

    // case airdropConstants.SET_LOADING_FORM:
    //   return {
    //     ...state,
    //     loadingForm: action.payload,
    //   };
    // case airdropConstants.SET_LOADING_AIRDROP:
    //   return {
    //     ...state,
    //     loadingAirdrop: action.payload,
    //   };

    default:
      return state;
  }
};

export default airdropReducer;
