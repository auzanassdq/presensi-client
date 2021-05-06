import { combineReducers } from 'redux'
import userReducer from './userReducer'
import matkulReducer from './matkulReducer'
import pertemuanReducer from './pertemuanReducer'


const rootReducer = combineReducers({
  userReducer,
  matkulReducer,
  pertemuanReducer,
});

export default rootReducer;
