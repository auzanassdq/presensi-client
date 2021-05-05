import { combineReducers } from 'redux'
import userReducer from './userReducer'
import matkulReducer from './matkulReducer'

const rootReducer = combineReducers({
  userReducer,
  matkulReducer,
});

export default rootReducer;
