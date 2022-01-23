import axios from 'axios';
import Cookies from 'js-cookie'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};

export const login = user => async dispatch => {
  dispatch(loginRequest());

  let result = await axios.post(
    process.env.REACT_APP_API + '/auth/login',
    user
  );

  if (result.data.token) {
    Cookies.set('token', result.data.token, { expires: 7 })
    dispatch(loginSuccess(result.data));
  } else {
    dispatch(loginFail());
  }
};
