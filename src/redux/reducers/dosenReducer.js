import {
  API_REQUEST,
  REQUEST_FAIL,
  REQ_DOSEN_SUCCESS,
  GET_ALL_DOSEN_SUCCESS,
} from '../actions/dosenAction';

const initialState = {
  isLoading: false,
  allDosen: [],
  dosen: {},
};

const dosenReducer = (state = initialState, action) => {
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
    case REQ_DOSEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dosen: action.payload,
      };
    case GET_ALL_DOSEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDosen: action.payload,
      };
    default:
      return state;
  }
};

export default dosenReducer;
