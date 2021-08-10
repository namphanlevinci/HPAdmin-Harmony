import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
  COUNT_FETCH_API,
} from "../constants/fetchApiConstants";

const initialState = {
  loading: false,
  page: 0,
  pageCount: 0,
  pageSize: 0,
  summary: {},
  totalRow: 0,
  countFetchApi: 0
};

const fetchApiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_API_REQUEST:
      return {
        loading: true,
      };
    case FETCH_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data ? payload.data : [],
        pageCount: payload.pages,
        pageSize: 5,
        summary: payload?.summary,
        totalRow: payload?.count,
      };

    case FETCH_API_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    case COUNT_FETCH_API:
      console.log('count_fetch_api : ', payload)
      return {
        ...state,
        countFetchApi: payload
      }

    default:
      return state;
  }
};

export { fetchApiReducer };
