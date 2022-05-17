import { signalConstants } from "../actions/signalAction";

const initialState = {
  filterQuery: {},
  query: " ",
  data: { count: 0, results: [] },
  loading: false
};

const signalReducer = (state = initialState, action) => {
  switch (action.type) {
    case signalConstants.SET_FILTER:
      let query = "?"
      let filterQuery = { ...state.filterQuery, [Object.keys(action.payload)[0] || undefined]: Object.values(action.payload)[0] || undefined }
      for (const q in filterQuery) {
        if (filterQuery[q] !== undefined && q.trim() !== null)
          query += `${q.trim()}=${filterQuery[q]}&`
      }
      return { ...state, filterQuery: filterQuery, query }
    case signalConstants.RESET_FILTER:
      return { ...state, filterQuery: {} }
    case signalConstants.SET_LOADING:
      return { ...state, loading: action.payload }
    case signalConstants.LOAD_DATA:
      return { ...state, data: action.payload, loading: false }
    default:
      return state
  }
}

export default signalReducer