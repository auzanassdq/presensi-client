import {
  API_REQUEST,
  GET_MATKUL_SUCCESS,
  GET_ALL_MATKUL_SUCCESS,
  GET_MAHASISWA_MATKUL_SUCCESS
} from '../actions/matkulAction'

const initialState = {
  isLoading: false,
  allPertemuan: [],
  pertemuanByMatkul: [],
  pertemuan: {}
}

const pertemuanReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MATKUL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matkul: action.payload,
      }
    case GET_ALL_MATKUL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allMatkul: action.payload,
      }
    case GET_MAHASISWA_MATKUL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mahasiswaMatkul: action.payload
      }
    default:
      return state
  }
}

export default pertemuanReducer