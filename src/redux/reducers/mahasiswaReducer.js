import {
  API_REQUEST,
  REQUEST_FAIL,
  REQ_MAHASISWA_SUCCESS,
  GET_ALL_MAHASISWA_SUCCESS,
} from '../actions/mahasiswaAction';

const initialState = {
  isLoading: false,
  allMahasiswa: [],
  mahasiswa: {},
};

const mahasiswaReducer = (state = initialState, action) => {
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
    case REQ_MAHASISWA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mahasiswa: action.payload,
      };
    case GET_ALL_MAHASISWA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allMahasiswa: action.payload,
      };
    default:
      return state;
  }
};

export default mahasiswaReducer;
