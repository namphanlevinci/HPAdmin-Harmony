import {
  RESTORE_STAFF_REQUEST,
  RESTORE_STAFF_SUCCESS,
  RESTORE_STAFF_FAILURE,
  ARCHIVE_STAFF_REQUEST,
  ARCHIVE_STAFF_SUCCESS,
  ARCHIVE_STAFF_FAILURE,
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
  GET_STAFF_FAILURE,
  GET_STAFF_BY_ID_REQUEST,
  GET_STAFF_BY_ID_SUCCESS,
  GET_STAFF_BY_ID_FAILURE,
  UPDATE_STAFF_BY_ID_REQUEST,
  UPDATE_STAFF_BY_ID_SUCCESS,
  UPDATE_STAFF_BY_ID_FAILURE,
} from "../constants/merchantConstants";

const restoreStaffReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case RESTORE_STAFF_REQUEST:
      return {
        loading: true,
      };
    case RESTORE_STAFF_SUCCESS:
      return {
        loading: false,
      };

    case RESTORE_STAFF_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const archiveStaffReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case ARCHIVE_STAFF_REQUEST:
      return {
        loading: true,
      };
    case ARCHIVE_STAFF_SUCCESS:
      return {
        loading: false,
      };

    case ARCHIVE_STAFF_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const getStaffReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case GET_STAFF_REQUEST:
      return {
        loading: true,
      };
    case GET_STAFF_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case GET_STAFF_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const getStaffByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case GET_STAFF_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_STAFF_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case GET_STAFF_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const updateStaffByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_STAFF_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_STAFF_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case UPDATE_STAFF_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export {
  restoreStaffReducer,
  archiveStaffReducer,
  getStaffReducer,
  getStaffByIdReducer,
  updateStaffByIdReducer,
};
