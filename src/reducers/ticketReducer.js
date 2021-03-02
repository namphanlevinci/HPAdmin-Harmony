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
export { getTicketByIdReducer, addTicketReducer, updateTicketReducer };
