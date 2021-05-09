import {
  API_REQUEST,
  GET_PERTEMUAN_SUCCESS,
  GET_PERTEMUAN_MATKUL_SUCCESS,
} from '../actions/pertemuanAction';

const initialState = {
  isLoading: false,
  pertemuanByMatkul: [],
  pertemuan: {},
};

const pertemuanReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        isLoading: true,
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
    default:
      return state;
  }
};

export default pertemuanReducer;
