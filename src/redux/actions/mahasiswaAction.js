import axios from "axios"
import { authHeader } from "../../utilities"

export const API_REQUEST = "API_REQUEST"
export const REQUEST_FAIL = "REQUEST_FAIL"
export const REQ_MAHASISWA_SUCCESS = "REQ_MAHASISWA_SUCCESS"
export const GET_ALL_MAHASISWA_SUCCESS = "GET_ALL_MAHASISWA_SUCCESS"

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

export const reqMahasiswaSuccess = payload => {
  return {
    type: REQ_MAHASISWA_SUCCESS,
    payload,
  };
};

const getAllMahasiswaSuccess = (payload) => {
  return {
    type: GET_ALL_MAHASISWA_SUCCESS,
    payload
  }
}

export const getAllMahasiswa = () => async dispatch => {
  dispatch(apiRequest())

  let result = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/mahasiswa`,
    headers: authHeader(),
  });

  if (result.data) {
    dispatch(getAllMahasiswaSuccess(result.data.data));
  } else {
    dispatch(requestFail());
  }
}

export const createMahasiswa = (data) => async dispatch => {
  dispatch(apiRequest())

  let result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/mahasiswa`,
    headers: authHeader(),
    data
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error('No');
  }

  dispatch(reqMahasiswaSuccess(result.data.data));
  return;
}

export const editMahasiswa = (data, mahasiswaId) => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API}/mahasiswa/${mahasiswaId}`,
    headers: authHeader(),
    data,
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error('No');
  }

  dispatch(reqMahasiswaSuccess(result.data.data));
  return;
};