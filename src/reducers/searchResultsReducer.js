// reducers/searchResultsReducer.js
import { SET_SEARCH_RESULTS } from '../actions/searchResultsActions';

const initialState = {
  results: [],
};

export default function searchResultsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
}
