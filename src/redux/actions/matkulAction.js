import axios from 'axios'

export const API_REQUEST = "API_REQUEST"
export const GET_MATKUL_SUCCESS = "GET_MATKUL_SUCCESS"
export const GET_ALL_MATKUL_SUCCESS = "GET_ALL_MATKUL_SUCCESS"
export const GET_MAHASISWA_MATKUL_SUCCESS = "GET_MAHASISWA_MATKUL_SUCCESS"

const apiRequest = () => {
  return {
    type: API_REQUEST
  }
}

const getMatkulSuccess = (payload) => {
  return {
    type: GET_MATKUL_SUCCESS,
    payload
  }
}

const getAllMatkulSuccess = (payload) => {
  return {
    type: GET_ALL_MATKUL_SUCCESS,
    payload
  }
}

const getMahasiswaMatkulSuccess = (payload) => {
  return {
    type: GET_MAHASISWA_MATKUL_SUCCESS,
    payload
  }
}

export const getMatkulByID = (idMatkul) => async (dispatch) => {
  dispatch(apiRequest())
  let token = localStorage.getItem("token")
  
  let result = await axios.get(process.env.REACT_APP_API + "/matkul/" + idMatkul,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  dispatch(getMatkulSuccess(result.data.data))
}

export const getAllMatkul = () => async (dispatch) => {
  dispatch(apiRequest())
  
  let result = await axios.get(process.env.REACT_APP_API + "/ambil-matkul")
  console.log(result);
  dispatch(getAllMatkulSuccess(result.data.data))
}

export const getMahasiswaMatkul = (userId) => async (dispatch) => {
  dispatch(apiRequest())
  let token = localStorage.getItem("token")
  
  let result = await axios.get(
    process.env.REACT_APP_API + "/ambil-matkul/mahasiswa/" + userId, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  dispatch(getMahasiswaMatkulSuccess(result.data.data))
}