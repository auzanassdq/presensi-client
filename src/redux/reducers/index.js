import { combineReducers } from 'redux';
import userReducer from './userReducer';
import matkulReducer from './matkulReducer';
import pertemuanReducer from './pertemuanReducer';
import kehadiranReducer from './kehadiranReducer';
import dosenReducer from './dosenReducer';
import mahasiswaReducer from './mahasiswaReducer';


const rootReducer = combineReducers({
  userReducer,
  matkulReducer,
  pertemuanReducer,
  kehadiranReducer,
  dosenReducer,
  mahasiswaReducer,
});

export default rootReducer;
