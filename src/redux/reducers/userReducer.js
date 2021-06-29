import jwt from 'jsonwebtoken';
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/userAction';

const token = localStorage.getItem('token');
let user = {};

if (token) user = jwt.verify(token, 'secret');
console.log(user);

const initialState = user._id
  ? {
      isLoading: false,
      isLogin: true,
      userId: user._id,
      nama: user.nama ? user.nama : "admin",
    }
  : {
      isLoading: false,
      isLogin: false,
      userId: '',
      nama: ''
    };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      console.log(action.payload);
      let user = jwt.verify(action.payload.token, 'secret');
      return {
        isLoading: false,
        isLogin: true,
        userId: user._id,
        nama: user.nama
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
      case LOGOUT:
        return {
          isLoading: false,
          isLogin: false,
          userId: '',
        }
    default:
      return state;
  }
};

export default userReducer;
