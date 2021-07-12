import axios from 'axios';
import { authHeader } from '../../utilities';

export const API_REQUEST = 'API_REQUEST';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SET_PERTEMUAN_ITEM = 'SET_PERTEMUAN_ITEM';
export const REQUEST_PERTEMUAN_SUCCESS = "REQUEST_PERTEMUAN_SUCCESS"
export const GET_PERTEMUAN_SUCCESS = 'GET_PERTEMUAN_SUCCESS';
export const GET_PERTEMUAN_MATKUL_SUCCESS = 'GET_PERTEMUAN_MATKUL_SUCCESS';
export const GET_PERTEMUAN_UPCOMING_SUCCESS = "GET_PERTEMUAN_UPCOMING_SUCCESS"
export const GET_PERTEMUAN_CURRENT_SUCCESS = "GET_PERTEMUAN_CURRENT_SUCCESS"

export const setPertemuanItem = (payload) => {
  return {
    type: SET_PERTEMUAN_ITEM,
    payload
  };
}

const apiRequest = () => {
  return {
    type: API_REQUEST,
  };
};

export const reqPertemuanSuccess = payload => {
  return {
    type: REQUEST_PERTEMUAN_SUCCESS,
    payload,
  };
};

export const requestFail = () => {
  return {
    type: REQUEST_FAIL,
  };
};

const getPertemuanSuccess = payload => {
  return {
    type: GET_PERTEMUAN_SUCCESS,
    payload,
  };
};

const getPertemuanUpcomingSuccess = payload => {
  return {
    type: GET_PERTEMUAN_UPCOMING_SUCCESS,
    payload,
  };
}

const getPertemuanCurrentSuccess = payload => {
  return {
    type: GET_PERTEMUAN_CURRENT_SUCCESS,
    payload,
  };
}

const getPertemuanMatkulSuccess = (payload, mahasiswaId) => {
  return {
    type: GET_PERTEMUAN_MATKUL_SUCCESS,
    payload,
    mahasiswaId
  };
};

export const getPertemuanCurrent = (mahasiswaId) => async dispatch => {
    dispatch(apiRequest());
  
    let result = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API}/pertemuan/current/${mahasiswaId}`,
      headers: authHeader(),
    });

    if (!result.data) {
      dispatch(requestFail());
      throw new Error('No');
    }
  
    dispatch(getPertemuanCurrentSuccess(result.data.data));
    return;
}

export const getPertemuanUpcoming = (mahasiswaId) => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/pertemuan/upcoming/${mahasiswaId}`,
    headers: authHeader(),
  });

  // if (!result.data) {
  //   dispatch(requestFail());
  //   throw new Error('No');
  // }

  dispatch(getPertemuanUpcomingSuccess(result.data.data));
  // return;
}

export const getPertemuanByID = pertemuanId => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/pertemuan/${pertemuanId}`,
    headers: authHeader(),
  });
  dispatch(getPertemuanSuccess(result.data.data));
};

export const getPertemuanByMatkul = (matkulId, mahasiswaId) => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/pertemuan/?matkul=${matkulId}`,
    headers: authHeader(),
  });
  dispatch(getPertemuanMatkulSuccess(result.data.data, mahasiswaId));
};

export const createPertemuan = data => async dispatch => {
  dispatch(apiRequest());
  console.log("tes");

  let result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/pertemuan`,
    headers: authHeader(),
    data,
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error("No");
  }

  dispatch(reqPertemuanSuccess(result.data.data));
  return
};

export const editPertemuan = (data, pertemuanId) => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API}/pertemuan/${pertemuanId}`,
    headers: authHeader(),
    data,
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error("No");
  }
  
  dispatch(reqPertemuanSuccess(result.data.data));
  return
};

export const deletePertemuan = pertemuanId => async dispatch => {
  let url = `${process.env.REACT_APP_API}/pertemuan/${pertemuanId}`;

  let result = await axios({
    method: 'delete',
    url,
    headers: authHeader(),
  });

  return result;
}
