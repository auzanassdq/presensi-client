import axios from 'axios'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_FAIL = "LOGIN_FAIL"

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

const loginFail = () => {
  return {
    type: LOGIN_FAIL
  }
}

export const login = (user) => async (dispatch) => {
  dispatch(loginRequest())
  
  let result = await axios.post(process.env.REACT_APP_API + "/auth/login", user)

  if (result.data.token) {
    localStorage.setItem("token", result.data.token)
    dispatch(loginSuccess(result.data))
  } else {
    dispatch(loginFail())
  }
}