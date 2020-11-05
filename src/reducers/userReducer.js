import * as types from "../constants/userConstants";

const getUserByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_USER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.GET_USER_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.GET_USER_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const archiveUserReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ARCHIVE_USER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.ARCHIVE_USER_BY_ID_SUCCESS:
      return {
        loading: false,
      };

    case types.ARCHIVE_USER_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const restoreUserReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.RESTORE_USER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.RESTORE_USER_BY_ID_SUCCESS:
      return {
        loading: false,
      };

    case types.RESTORE_USER_BY_ID_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const updateUserByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_USER_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_USER_ADMIN_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.UPDATE_USER_ADMIN_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

const changeUserPasswordByIdReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_USER_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_USER_PASSWORD_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.UPDATE_USER_ADMIN_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export {
  updateUserByIdReducer,
  changeUserPasswordByIdReducer,
  getUserByIdReducer,
  archiveUserReducer,
  restoreUserReducer,
};
