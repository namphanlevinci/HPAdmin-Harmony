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
        ...state,
        loading: true,
      };
    case types.GET_USER_BY_ID_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
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
        ...state,
        loading: true,
      };
    case types.UPDATE_USER_ADMIN_SUCCESS:
      return {
        loading: false,
        data: payload,
      };

    case types.UPDATE_USER_ADMIN_FAILURE:
      return {
        ...state,
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

const userLoginReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: payload,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        loading: false,
      };
    case types.USER_LOGOUT_SUCCESS:
      return {
        user: {},
      };
    default:
      return state;
  }
};

const verifyUserReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.VERIFY_USER_REQUEST:
      return {
        loading: true,
      };
    case types.VERIFY_USER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));

      return {
        loading: false,
        user: payload,
      };
    case types.VERIFY_USER_FAILURE:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

const userPermissionReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_PERMISSION_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PERMISSION_BY_ID_SUCCESS:
      return {
        loading: false,
        permissions: payload,
      };
    case types.GET_PERMISSION_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

const allPermissionReducer = (
  state = {
    loading: false,
    allPermissions: [],
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_ALL_PERMISSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_PERMISSION_SUCCESS:
      return {
        loading: false,
        allPermissions: payload,
      };
    case types.GET_ALL_PERMISSION_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

const updatePermissionReducer = (
  state = {
    loading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_PERMISSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PERMISSION_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.UPDATE_PERMISSION_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

const allUserReducer = (
  state = {
    loading: false,
    userList: [],
  },
  { type, payload }
) => {
  switch (type) {
    case types.GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_USER_SUCCESS:
      return {
        loading: false,
        userList: payload,
      };
    case types.GET_ALL_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

const addUserReducer = (
  state = {
    loading: false,
    statusAddUser : false,
  },
  { type, payload }
) => {
  switch (type) {
    case types.ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_USER_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case types.ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    
    case types.UPDATE_STATUS_ADD_USER:
      return{
        ...state,
        statusAddUser : payload,
      }

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
  userLoginReducer,
  verifyUserReducer,
  userPermissionReducer,
  allPermissionReducer,
  updatePermissionReducer,
  allUserReducer,
  addUserReducer,
};
