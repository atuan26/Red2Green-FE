import { signalConstants } from "../actions/signalAction";

const initialState = {
  filterQuery: {},
  query: " ",
  data: { count: 0, results: [] }
};

const signalReducer = (state = initialState, action) => {
  switch (action.type) {
    case signalConstants.SET_FILTER:
      let query = "?"
      let filterQuery = { ...state.filterQuery, [Object.keys(action.payload)[0] || undefined]: Object.values(action.payload)[0] || undefined }
      for (const q in filterQuery) {
        if (filterQuery[q] !== undefined)
          query += `${q.trim()}=${filterQuery[q]}&`
      }
      return { ...state, filterQuery: filterQuery, query }
    case signalConstants.RESET_FILTER:
      return { ...state, filterQuery: {} }
    case signalConstants.LOAD_DATA:
      console.log('### action.payload :', action.payload)
      return { ...state, data: action.payload }
    default:
      return state
  }
}

export default signalReducer