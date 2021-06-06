import {
  API_REQUEST,
  REQUEST_FAIL,
  REQUEST_PERTEMUAN_SUCCESS,
  GET_PERTEMUAN_SUCCESS,
  GET_PERTEMUAN_MATKUL_SUCCESS,
  GET_PERTEMUAN_UPCOMING_SUCCESS,
  GET_PERTEMUAN_CURRENT_SUCCESS,
} from '../actions/pertemuanAction';

const initialState = {
  isLoading: false,
  pertemuanByMatkul: [],
  pertemuanUpcoming: {},
  pertemuanCurrent: {},
  pertemuan: {},
};

const pertemuanReducer = (state = initialState, action) => {
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
    case REQUEST_PERTEMUAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pertemuan: action.payload,
      };
    case GET_PERTEMUAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pertemuan: action.payload,
      };
    case GET_PERTEMUAN_MATKUL_SUCCESS:
      let data = action.payload;

      if (action.mahasiswaId) {
        data = data.map(item => ({
          ...item,
          kehadiran: item.kehadiran.find(
            item => item.mahasiswa === action.mahasiswaId
          ),
        }));
      }
      return {
        ...state,
        isLoading: false,
        pertemuanByMatkul: data,
      };
    case GET_PERTEMUAN_CURRENT_SUCCESS: 
      return {
        ...state,
        pertemuanCurrent: action.payload
      }
      case GET_PERTEMUAN_UPCOMING_SUCCESS: 
      return {
        ...state,
        pertemuanUpcoming: action.payload
      }
    default:
      return state;
  }
};

export default pertemuanReducer;
