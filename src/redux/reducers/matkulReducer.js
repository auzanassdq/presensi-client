import {
  API_REQUEST,
  REQUEST_FAIL,
  REQUEST_MATKUL_SUCCESS,
  GET_MATKUL_SUCCESS,
  GET_ALL_MATKUL_SUCCESS,
  GET_MAHASISWA_MATKUL_SUCCESS,
  CREATE_MATKUL_SUCCESS,
} from '../actions/matkulAction';

const initialState = {
  isLoading: false,
  allMatkul: [],
  mahasiswaMatkul: [],
  matkul: {},
};

const matkulReducer = (state = initialState, action) => {
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
    case REQUEST_MATKUL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matkul: action.payload,
      };
    case CREATE_MATKUL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matkul: action.payload,
      };
    case GET_MATKUL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matkul: action.payload,
      };
    case GET_ALL_MATKUL_SUCCESS:
      console.log(action);
      let allMatkul = action.payload

      if (action.user && action.user.role === 'dosen') {
        allMatkul = allMatkul.filter(item => item.dosen._id === action.user.userId)
      }

      return {
        ...state,
        isLoading: false,
        allMatkul
      };
    case GET_MAHASISWA_MATKUL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mahasiswaMatkul: action.payload,
      };
    default:
      return state;
  }
};

export default matkulReducer;
