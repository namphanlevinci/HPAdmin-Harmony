import * as types from "../../actions/consumer/types";

const initialState = {
  Consumer: "",
  ViewConsumer: "",
  UpdateConsumer: "",
};

const ConsumerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CONSUMER_BY_ID_SUCCESS:
      return { ...state, Consumer: payload };
    case types.GET_CONSUMER_BY_ID_FAILURE:
      return state;
    case types.UPDATE_CONSUMER_SUCCESS:
      return { ...state, UpdateConsumer: payload };
    case types.UPDATE_CONSUMER_FAILURE:
      return state;

    default:
      return state;
  }
};

export default ConsumerReducer;
