import * as types from "../constants/ticketConstants";

const getTicketByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_TICKET_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_TICKET_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.GET_TICKET_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const getTicketCommenByIdReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case types.GET_TICKET_COMMENT_REQUEST:
      return { ...state, loading: true };
    case types.GET_TICKET_COMMENT_SUCCESS:
      return { loading: false, data: payload };
    case types.GET_TICKET_COMMENT_FAILURE:
      return { data: payload, loading: false };
    default:
      return state;
  }
};

const getTicketLogByIdReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case types.GET_TICKET_LOG_REQUEST:
      return { ...state, loading: true };
    case types.GET_TICKET_LOG_SUCCESS:
      return { loading: false, data: payload };
    case types.GET_TICKET_LOG_FAILURE:
      return { data: payload, loading: false };
    default:
      return state;
  }
};

const sendCommentReducer = (state = { loading: false }, { type, payload }) => {
  switch (type) {
    case types.SEND_COMMENT_REQUEST:
      return { loading: true };
    case types.SEND_COMMENT_SUCCESS:
      return { loading: false, data: payload };
    case types.SEND_COMMENT_FAILURE:
      return { data: payload, loading: false };
    default:
      return state;
  }
};

const addTicketReducer = (state = { loading: false }, { type, payload }) => {
  switch (type) {
    case types.GET_TICKET_BY_ID_REQUEST:
      return { loading: true };
    case types.GET_TICKET_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.GET_TICKET_BY_ID_FAILURE:
      return {
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};
const updateTicketReducer = (state = { loading: false }, { type, payload }) => {
  switch (type) {
    case types.UPDATE_TICKET_REQUEST:
      return { loading: true };
    case types.UPDATE_TICKET_SUCCESS:
      return { loading: false, data: payload };
    case types.UPDATE_TICKET_FAILURES:
      return { loading: false, data: payload };
    default:
      return state;
  }
};

const addTicketFile = (state = { loading: false }, { type, payload }) => {
  switch (type) {
    case types.ADD_TICKET_FILE_REQUEST:
      return { loading: true };
    case types.ADD_TICKET_FILE_SUCCESS:
      return { loading: false, data: payload };
    case types.ADD_TICKET_FILE_REQUEST:
      return { loading: false, data: payload };
    default:
      return state;
  }
};

const delTicketFileReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case types.DELETE_TICKET_FILE_REQUEST:
      return { loading: true };
    case types.DELETE_TICKET_FILE_SUCCESS:
      return { loading: false, data: payload };
    case types.DELETE_TICKET_FILE_FAILURE:
      return { loading: false, data: payload };
    default:
      return state;
  }
};

const changeTicketStatusReducer = (
  state = { loading: false },
  { type, payload }
) => {
  switch (type) {
    case types.CHANGE_STATUS_REQUEST:
      return { loading: true };
    case types.CHANGE_STATUS_SUCCESS:
      return { loading: false, data: payload };
    case types.CHANGE_STATUS_FAILURE:
      return { loading: false, data: payload };
    default:
      return state;
  }
};
export {
  getTicketByIdReducer,
  addTicketReducer,
  sendCommentReducer,
  updateTicketReducer,
  getTicketCommenByIdReducer,
  getTicketLogByIdReducer,
  delTicketFileReducer,
  addTicketFile,
  changeTicketStatusReducer,
};
