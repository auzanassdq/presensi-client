import axios from 'axios';
import { authHeader } from '../../utilities';

export const API_REQUEST = 'API_REQUEST';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const REQUEST_MATKUL_SUCCESS = 'REQUEST_MATKUL_SUCCESS';
export const CREATE_MATKUL_SUCCESS = 'CREATE_MATKUL_SUCCESS';
export const GET_MATKUL_SUCCESS = 'GET_MATKUL_SUCCESS';
export const GET_ALL_MATKUL_SUCCESS = 'GET_ALL_MATKUL_SUCCESS';
export const GET_MAHASISWA_MATKUL_SUCCESS = 'GET_MAHASISWA_MATKUL_SUCCESS';

const apiRequest = () => {
  return {
    type: API_REQUEST,
  };
};

export const requestFail = () => {
  return {
    type: REQUEST_FAIL,
  };
};

const getMatkulSuccess = payload => {
  return {
    type: GET_MATKUL_SUCCESS,
    payload,
  };
};

const getAllMatkulSuccess = (payload, user) => {
  return {
    type: GET_ALL_MATKUL_SUCCESS,
    payload,
    user
  };
};

const getMahasiswaMatkulSuccess = payload => {
  return {
    type: GET_MAHASISWA_MATKUL_SUCCESS,
    payload,
  };
};

const createMatkulSuccess = payload => {
  return {
    type: CREATE_MATKUL_SUCCESS,
    payload,
  };
};

export const reqMatkulSuccess = payload => {
  return {
    type: REQUEST_MATKUL_SUCCESS,
    payload,
  };
};

export const getMatkulByID = idMatkul => async dispatch => {
  dispatch(apiRequest());

  let result = await axios.get(
    process.env.REACT_APP_API + '/matkul/' + idMatkul,
    { headers: authHeader() }
  );
  if (result.data) {
    dispatch(getMatkulSuccess(result.data.data));
  } else {
    dispatch(requestFail());
  }
};

export const getAllMatkul = (matkul, user) => async dispatch => {
  dispatch(apiRequest());
  let url = `${process.env.REACT_APP_API}/matkul`;

  if (matkul) url += `/?matkul=${matkul}`;

  let result = await axios.get(url, {
    headers: authHeader(),
  });
  // console.log(result);
  if (result.data) {
    dispatch(getAllMatkulSuccess(result.data.data, user));
  } else {
    dispatch(requestFail());
  }
};

export const getMahasiswaMatkul = userId => async dispatch => {
  dispatch(apiRequest());

  let result = await await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/ambil-matkul/mahasiswa/${userId}`,
    headers: authHeader(),
  });

  if (result.data) {
    dispatch(getMahasiswaMatkulSuccess(result.data.data));
  } else {
    dispatch(requestFail());
  }
};

export const createMatkul = data => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/matkul`,
    headers: authHeader(),
    data,
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error('No');
  }

  dispatch(createMatkulSuccess(result.data.data));
  return;
};

export const editMatkul = (data, matkulId) => async dispatch => {
  dispatch(apiRequest());

  let result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API}/matkul/${matkulId}`,
    headers: authHeader(),
    data,
  });

  if (!result.data) {
    dispatch(requestFail());
    throw new Error('No');
  }

  dispatch(reqMatkulSuccess(result.data.data));
  return;
};

export const cekAmbilMatkul = data => async dispatch => {
  console.log(data);

  let result = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/ambil-matkul/check/?matkul=${data.matkul}&mahasiswa=${data.mahasiswa}`,
    headers: authHeader(),
  });

  return result
};

export const ambilMatkul = data => async dispatch => {
  let url = `${process.env.REACT_APP_API}/ambil-matkul`;
  console.log(data);

  let result = await axios({
    method: 'post',
    url,
    headers: authHeader(),
    data,
  });

  return result;
};

export const removeAmbilKelas = data => async dispatch => {
  let url = `${process.env.REACT_APP_API}/ambil-matkul`;
  console.log(data);

  let result = await axios({
    method: 'delete',
    url,
    headers: authHeader(),
    data,
  });

  return result;
}