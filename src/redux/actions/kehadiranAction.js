import axios from 'axios'
import { authHeader } from '../../utilities'

export const API_REQUEST = "API_REQUEST"
export const GET_KEHADIRAN_SUCCESS = "GET_KEHADIRAN_SUCCESS"

const apiRequest = () => {
  return {
    type: API_REQUEST
  }
}

export const getKehadiranSuccess = (payload) => {
  return {
    type: GET_KEHADIRAN_SUCCESS,
    payload
  }
}

export const checkInKehadiran = (data) => async (dispatch) => {
  dispatch(apiRequest())
  
  let result = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API}/kehadiran/check-in`,
    headers: authHeader(),
    data
  })

  return result.data.data
}