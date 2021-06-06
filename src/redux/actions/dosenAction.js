import axios from "axios"
import { authHeader } from "../../utilities"

export const API_REQUEST = "API_REQUEST"
export const REQUEST_FAIL = "REQUEST_FAIL"
export const REQ_DOSEN_SUCCESS = "REQ_DOSEN_SUCCESS"
export const GET_ALL_DOSEN_SUCCESS = "GET_ALL_DOSEN_SUCCESS"

const apiRequest = () => {
  return {
    type: API_REQUEST
  }
}

const requestFail = () => {
  return {
    type: REQUEST_FAIL
  }
}

export const reqDosenSuccess = payload => {
  return {
    type: REQ_DOSEN_SUCCESS,
    payload,
  };
};

const getAllDosenSuccess = (payload) => {
  return {
    type: GET_ALL_DOSEN_SUCCESS,
    payload
  }
}

export const getAllDosen = () => async dispatch => {
  dispatch(apiRequest())

  let result = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/dosen`,
    headers: authHeader(),
  });

  if (result.data) {
    dispatch(getAllDosenSuccess(result.data.data));
  } else {
    dispatch(requestFail());
  }
}

export const createDosen = (data) => async dispatch => {
  dispatch(apiRequest())

  let result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/dosen`,
    headers: authHeader(),
    data
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error('No');
  }

  dispatch(reqDosenSuccess(result.data.data));
  return;
}

export const editDosen = (data, dosenId) => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API}/dosen/${dosenId}`,
    headers: authHeader(),
    data,
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error('No');
  }

  dispatch(reqDosenSuccess(result.data.data));
  return;
};