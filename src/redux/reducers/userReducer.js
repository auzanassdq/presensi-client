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

const initialState = user._id
  ? {
      isLoading: false,
      isLogin: true,
      userId: user._id,
    }
  : {
      isLoading: false,
      isLogin: false,
      userId: '',
    };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        isLogin: true,
        userId: action.payload.userId,
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
