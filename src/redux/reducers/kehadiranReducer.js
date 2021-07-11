import {
  API_REQUEST,
  REQUEST_FAIL,
  REQ_KEHADIRAN_SUCCESS,
  GET_KEHADIRAN_PERTEMUAN_SUCCESS,
} from '../actions/kehadiranAction';

const initialState = {
  isLoading: false,
  kehadiran: {},
  kehadiranByPertemuan: [],
};

const kehadiranReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case REQ_KEHADIRAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        kehadiran: action.payload,
      };
    case GET_KEHADIRAN_PERTEMUAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        kehadiranByPertemuan: action.payload,
      };
    default:
      return state;
  }
};

export default kehadiranReducer;
