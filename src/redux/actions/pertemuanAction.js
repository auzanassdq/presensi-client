import axios from 'axios'

export const API_REQUEST = "API_REQUEST"
export const GET_PERTEMUAN_SUCCESS = "GET_PERTEMUAN_SUCCESS"
export const GET_PERTEMUAN_MATKUL_SUCCESS = "GET_PERTEMUAN_MATKUL_SUCCESS"

const apiRequest = () => {
  return {
    type: API_REQUEST
  }
}

const getPertemuanSuccess = (payload) => {
  return {
    type: GET_PERTEMUAN_SUCCESS,
    payload
  }
}

const getPertemuanMatkulSuccess = (payload) => {
  return {
    type: GET_PERTEMUAN_MATKUL_SUCCESS,
    payload
  }
}

export const getPertemuanByID = (pertemuanId) => async (dispatch) => {
  dispatch(apiRequest())
  let token = localStorage.getItem("token")
  
  let result = await axios.get(process.env.REACT_APP_API + "/pertemuan/" + pertemuanId,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  dispatch(getPertemuanSuccess(result.data.data))
}

export const getPertemuanByMatkul = (matkulId) => async (dispatch) => {
  console.log(matkulId);
  dispatch(apiRequest())
  let token = localStorage.getItem("token")
  
  let result = await axios.get(
    process.env.REACT_APP_API + "/pertemuan/matkul/" + matkulId, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  dispatch(getPertemuanMatkulSuccess(result.data.data))
}