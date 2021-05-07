import {
  API_REQUEST,
  GET_KEHADIRAN_SUCCESS,
} from '../actions/kehadiranAction'

const initialState = {
  isLoading: false,
  kehadiran: {}
}

const kehadiranReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_KEHADIRAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        kehadiran: action.payload,
      }
    default:
      return state
  }
}

export default kehadiranReducer