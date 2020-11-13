import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
} from "../constants/fetchApiConstants";

const initialState = {
  loading: false,
  page: 0,
  pageCount: 0,
  pageSize: 0,
};

const fetchApiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_API_REQUEST:
      return {
        loading: true,
      };
    case FETCH_API_SUCCESS:
      return {
        loading: false,
        data: payload.data ? payload.data : [],
        pageCount: payload.pages,
        pageSize: 5,
      };

    case FETCH_API_FAILURE:
      return {
        loading: false,
        error: payload,
        data: [],
      };
    default:
      return state;
  }
};

export { fetchApiReducer };
