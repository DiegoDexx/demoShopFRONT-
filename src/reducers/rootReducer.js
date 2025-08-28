import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import searchResultsReducer from './searchResultsReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  searchResults: searchResultsReducer,
});

export default rootReducer;