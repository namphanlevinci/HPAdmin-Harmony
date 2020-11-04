import * as types from "../constants/consumerConstants";

const getConsumerByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_CONSUMER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_CONSUMER_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.GET_CONSUMER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const archiveConsumerByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_CONSUMER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_CONSUMER_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.ARCHIVE_CONSUMER_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const restoreConsumerByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_CONSUMER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_CONSUMER_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.RESTORE_CONSUMER_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export {
  getConsumerByIdReducer,
  restoreConsumerByIdReducer,
  archiveConsumerByIdReducer,
};
