import { combineReducers } from 'redux';
import userReducer from './userReducer';
import matkulReducer from './matkulReducer';
import pertemuanReducer from './pertemuanReducer';
import kehadiranReducer from './kehadiranReducer';

const rootReducer = combineReducers({
  userReducer,
  matkulReducer,
  pertemuanReducer,
  kehadiranReducer,
});

export default rootReducer;
