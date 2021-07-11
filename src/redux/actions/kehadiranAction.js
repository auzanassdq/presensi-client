import axios from 'axios'
import { authHeader } from '../../utilities'

export const API_REQUEST = "API_REQUEST"
export const REQUEST_FAIL = "REQUEST_FAIL"

export const REQ_KEHADIRAN_SUCCESS = "REQ_KEHADIRAN_SUCCESS"
export const GET_KEHADIRAN_PERTEMUAN_SUCCESS = "GET_KEHADIRAN_PERTEMUAN_SUCCESS"


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

export const reqKehadiranSuccess = (payload) => {
  return {
    type: REQ_KEHADIRAN_SUCCESS,
    payload
  }
}

export const getKehadiranPertemuanSuccess = (payload) => {
  return {
    type: GET_KEHADIRAN_PERTEMUAN_SUCCESS,
    payload
  }
}

export const checkInKehadiran = (data) => async (dispatch) => {
  dispatch(apiRequest())
  
  let result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/kehadiran/`,
    headers: authHeader(),
    data
  })

  return result.data.data
}

export const getKehadiranPertemuan = (pertemuanId) => async (dispatch) => {
  dispatch(apiRequest())
  
  let result = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/kehadiran/?pertemuan=${pertemuanId}`,
    headers: authHeader(),
  })

  if (result.data) {
    dispatch(getKehadiranPertemuanSuccess(result.data.data));
  } else {
    dispatch(requestFail());
  }
}

export const editKehadiran = (kehadiranId, data) => async (dispatch) => {
  dispatch(apiRequest())
  
  let result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API}/kehadiran/${kehadiranId}`,
    headers: authHeader(),
    data
  })

  if (!result.data) {
    dispatch(requestFail());
    throw new Error('No');
  }

  dispatch(reqKehadiranSuccess(result.data.data));
  return;
}